'use client'

import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import AdminPageList from '../../admin/admin_page_list_create/page';

const AdminSidebar = ({ isSidebarActive }) => {

    const [adminList, setAdminList] = useState([])
    const [display_name_arr, setDisplay_name_arr] = useState([])
    const [displayNameArr, setDisplayNameArr] = useState([])
    const [selectArr, setSelectArr] = useState([])
    const [toggleStates1, setToggleStates1] = useState(Array(display_name_arr.length).fill(false));
    const [toggleStates2, setToggleStates2] = useState(Array(display_name_arr.length).fill(false));
    

    useEffect(() => {
        fetchAdminData();
    }, []);
    // AdminPageList()
    

    const fetchAdminData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`);
            const jsonData = await response.json();
            const allParent = jsonData?.filter(p => (p?.parent_id) === 0)
            setAdminList(allParent)

            // daynamic work start
            const name_arr = []
            const nameArr = [];
            allParent.map(p => {
                p?.page_group && name_arr.push(p?.page_group)

                // Function to convert snake_case to Title Case
                const titleCaseWord = (word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                };
                // Convert controller_name to display_name
                const display_name = p?.page_group?.split("_")
                    .map(word => titleCaseWord(word))
                    .join(" ");

                display_name && nameArr.push(display_name);
            })

            let outputArray = nameArr.filter(function (v, i, self) {
                return i == self.indexOf(v);
            });

            let output_array = name_arr.filter(function (v, i, self) {
                return i == self.indexOf(v);
            });

            setDisplay_name_arr([...output_array])
            setDisplayNameArr([...outputArray]);
            // daynamic work end  

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    function selectIndex1(index) {
        const Management = adminList?.filter(a => (a?.page_group === display_name_arr[index]))
        setSelectArr(Management)
        
        const newToggleStates = [...toggleStates1];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates1(newToggleStates);

    }

    function selectIndex2(index) {
        const newToggleStates = [...toggleStates2];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates2(newToggleStates);

    }

    return (
        <nav id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''} `} >
            <div className="sidebar-header mt-2">
                <div className="media d-flex">
                    <img
                        className="rounded-circle mt-2"
                        src="https://atik.urbanitsolution.com/web_content/img/user.png"
                        alt=""
                        width="50"
                        height="50"
                    />

                    <Dropdown>
                        <Dropdown.Toggle className='text-start text-white border-0' variant="none" id="dropdown-basic">
                            <div className='sideLine'>
                                <h6 className='mt-1'>পাঠশালা স্কুল এন্ড কলেজ</h6>
                                <h6>admin</h6>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='mt-2 ms-2'>
                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/users_edit/2">
                                <FontAwesomeIcon icon={faUserEdit} /> Edit Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/users/change_password/2">
                                <FontAwesomeIcon icon={faKey} /> Change Password
                            </Dropdown.Item>
                            <Dropdown.Item href="https://atik.urbanitsolution.com/Admin/login/logout">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <ul className=" text-white">
                <button className=' dashboard p-2'>
                    <Link className='' href='/Admin/dashboard'>Dashboard</Link>
                </button>

                {displayNameArr?.map((data, index) => (
                    <button className=' dashboard-dropdown ' key={index}>
                        <li>
                            <a
                                href={`#${display_name_arr[index]}`}
                                data-toggle="collapse"
                                aria-expanded="false"
                                style={{ position: 'relative' }}
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectIndex1(index); }}
                            >
                                {data}
                                <span style={{ position: 'absolute', right: '10px' }}>
                                    {toggleStates1[index] ? (
                                        <i class="caret-down pt-1 fas fa-angle-down"></i>
                                    ) : (
                                        <i class="caret-right pt-1 fas fa-angle-right "></i>
                                    )}
                                </span>
                            </a>
                            <ul className="collapse list-unstyled" id={`${display_name_arr[index]}`}>
                                <li>
                                    {selectArr?.map((item, innerIndex) => (
                                        <div key={innerIndex} className='borderStyle1'>
                                            <a
                                                href={`#${item?.controller_name}_${index}_${innerIndex}`}
                                                data-toggle="collapse"
                                                aria-expanded="false"
                                                style={{ position: 'relative' }}
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectIndex2( innerIndex); }}
                                            >
                                                {item?.display_name}

                                                <span style={{ position: 'absolute', right: '10px' }}>
                                                    {toggleStates2[innerIndex] ? (
                                                        <i className="caret-down pt-1 fas fa-angle-down"></i>
                                                    ) : (
                                                        <i className="caret-right pt-1 fas fa-angle-right "></i>
                                                    )}
                                                </span>
                                            </a>

                                            <ul className="collapse list-unstyled " id={`${item?.controller_name}_${index}_${innerIndex}`} >
                                                <li className='borderStyle1' style={{ background: '#314B81' }}>
                                                    <Link href="/Admin/admin_page_list/admin_page_list_create">
                                                        {item?.display_name} Create
                                                    </Link>
                                                </li>
                                                <li className='borderStyle1' style={{ background: '#314B81' }}>
                                                    <Link href="/Admin/admin_page_list/admin_page_list_create">
                                                        {item?.display_name} List
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </li>
                            </ul>
                        </li>
                    </button>
                ))}
            </ul>
        </nav>
    )
}

export default AdminSidebar