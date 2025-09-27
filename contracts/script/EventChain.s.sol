// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import "../src/EventChain.sol";



contract EventTicketScript is Script {
    EventTicket public eventTicket;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        eventTicket = new EventTicket();

        vm.stopBroadcast();
    }
}
