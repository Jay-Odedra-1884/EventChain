// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";

contract EventTicket is Ownable {


    constructor () Ownable(msg.sender) {
        
    }

    struct Event {
        string name;
        uint maxSupply;
        uint ticketPrice;
        uint ticketsSold;
        uint maxTicketsPerUser;
        address organizer;
    }

    Event[] public allEvents;

    mapping(address => Event[]) public events;

    mapping(address => mapping(uint => uint)) public ticketsOwned;

    // Create a new event
    function createEvent(
        string memory _name,
        uint _maxSupply,
        uint _ticketPrice
    ) external {
        Event memory e = Event({
            name: _name,
            maxSupply: _maxSupply,
            ticketPrice: _ticketPrice,
            ticketsSold: 0,
            maxTicketsPerUser: 5,
            organizer: msg.sender
        });

        events[msg.sender].push(e);
        allEvents.push(e);
    }

    // Buy tickets for a specific event (by organizer and event index)
    function buyTicket(address organizer, uint eventIndex, uint qty) external payable {
        require(eventIndex < events[organizer].length, "Event does not exist");

        Event storage e = events[organizer][eventIndex];

        require(qty > 0, "Quantity must be greater than zero");
        require(msg.value == e.ticketPrice * qty, "Incorrect payment amount");
        require(ticketsOwned[msg.sender][eventIndex] + qty <= e.maxTicketsPerUser, "Exceeds max tickets per user");
        require(e.ticketsSold + qty <= e.maxSupply, "Not enough tickets available");

        e.ticketsSold += qty;
        ticketsOwned[msg.sender][eventIndex] += qty;
    }

    // Admin function to update an event (only organizer can call)
    function changeMaxSupply(uint eventIndex, uint _newSupply) external {
        Event storage e = events[msg.sender][eventIndex];
        require(_newSupply >= e.ticketsSold, "Cannot reduce below sold tickets");
        e.maxSupply = _newSupply;
    }

    function changeTicketPrice(uint eventIndex, uint _newPrice) external {
        Event storage e = events[msg.sender][eventIndex];
        e.ticketPrice = _newPrice;
    }

    function changeMaxTicketsPerUser(uint eventIndex, uint _newLimit) external {
        Event storage e = events[msg.sender][eventIndex];
        e.maxTicketsPerUser = _newLimit;
    }

    // Withdraw function for organizer
    function withdraw() external {
        uint balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Get event details
    function getEventDetails(address organizer, uint eventIndex)
        external
        view
        returns (
            string memory eventName,
            uint _maxSupply,
            uint _ticketPrice,
            uint _ticketsSold,
            uint _maxTicketsPerUser,
            address _organizer
        )
    {
        Event storage e = events[organizer][eventIndex];
        return (
            e.name,
            e.maxSupply,
            e.ticketPrice,
            e.ticketsSold,
            e.maxTicketsPerUser,
            e.organizer
        );
    }

    function getEventsDetails() public view returns (Event[] memory) {
        return allEvents;
    }
}
