import React from 'react'

import { FaChalkboardTeacher, FaHome, FaUserFriends } from 'react-icons/fa'
import { BiSolidInstitution } from "react-icons/bi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";

export default function LowerNav() {
    return (
        <>
            <li><FaHome /></li>
            <li><FaUserFriends /></li>
            <li><FaChalkboardTeacher /></li>
            <li><BiSolidInstitution /></li>
            <li><HiOutlineStatusOnline /></li>
            <li><CgNotes /></li>
        </>
    )
}
