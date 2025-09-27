// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "forge-std/Test.sol";
import "../src/EventChain.sol";


contract EventTicketTest is Test {
    EventTicket public eventTicket;

    address organizer = address(0x1);
    address user1 = address(0x2);
    address user2 = address(0x3);

    function setUp() public {
        vm.prank(organizer);
        eventTicket = new EventTicket();
    }

    function testCreateEvent() public {
        vm.prank(organizer);
        eventTicket.createEvent("Rock Concert", 100, 0.1 ether);

        (
            string memory name,
            uint maxSupply,
            uint ticketPrice,
            uint ticketsSold,
            uint maxTicketsPerUser,
            address org
        ) = eventTicket.getEventDetails(organizer, 0);

        assertEq(name, "Rock Concert");
        assertEq(maxSupply, 100);
        assertEq(ticketPrice, 0.1 ether);
        assertEq(ticketsSold, 0);
        assertEq(maxTicketsPerUser, 5);
        assertEq(org, organizer);
    }

    function testBuyTicket() public {
        // Organizer creates event
        vm.prank(organizer);
        eventTicket.createEvent("Football Match", 50, 0.05 ether);

        // User buys ticket
        vm.deal(user1, 1 ether); // give user1 ETH
        vm.prank(user1);
        eventTicket.buyTicket{value: 0.05 ether}(organizer, 0, 1);

        (, , , uint ticketsSold, , ) = eventTicket.getEventDetails(organizer, 0);
        assertEq(ticketsSold, 1);

        uint owned = eventTicket.ticketsOwned(user1, 0);
        assertEq(owned, 1);
    }

    function test_RevertWhen_BuyTicketWithoutEnoughPayment() public {
        vm.prank(organizer);
        eventTicket.createEvent("Hackathon", 10, 0.1 ether);

        vm.deal(user1, 1 ether);
        vm.prank(user1);
        // Wrong payment -> should revert
        vm.expectRevert(bytes("Incorrect payment amount"));
        eventTicket.buyTicket{value: 0.05 ether}(organizer, 0, 1);
    }

    function test_RevertWhen_BuyTooManyTickets() public {
        vm.prank(organizer);
        eventTicket.createEvent("Seminar", 5, 0.01 ether);

        vm.deal(user1, 1 ether);
        vm.prank(user1);
        vm.expectRevert(bytes("Exceeds max tickets per user"));
        // Default max per user = 5, so buying 6 should fail
        eventTicket.buyTicket{value: 0.06 ether}(organizer, 0, 6);
    }

    function testChangeEventDetails() public {
        vm.startPrank(organizer);
        eventTicket.createEvent("Expo", 100, 1 ether);

        // Change supply
        eventTicket.changeMaxSupply(0, 200);
        (, uint maxSupply, , , , ) = eventTicket.getEventDetails(organizer, 0);
        assertEq(maxSupply, 200);

        // Change ticket price
        eventTicket.changeTicketPrice(0, 2 ether);
        (, , uint ticketPrice, , , ) = eventTicket.getEventDetails(organizer, 0);
        assertEq(ticketPrice, 2 ether);

        // Change max tickets per user
        eventTicket.changeMaxTicketsPerUser(0, 10);
        (, , , , uint limit, ) = eventTicket.getEventDetails(organizer, 0);
        assertEq(limit, 10);
        vm.stopPrank();
    }

    function testWithdrawFunds() public {
        vm.startPrank(organizer);
        eventTicket.createEvent("Tech Talk", 10, 0.1 ether);
        vm.stopPrank();

        vm.deal(user1, 1 ether);
        vm.prank(user1);
        eventTicket.buyTicket{value: 0.1 ether}(organizer, 0, 1);

        uint beforeBalance = organizer.balance;

        vm.prank(organizer);
        eventTicket.withdraw();

        uint afterBalance = organizer.balance;
        assertEq(afterBalance, beforeBalance + 0.1 ether);
    }
}
