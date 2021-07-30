import '../src/Style/style.scss'
import dataJson     from './data.json';
import { useState } from 'react';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { GrClose } from '@react-icons/all-files/gr/GrClose';


function App() {
    const [searchCustomer, setSearchCustomer] = useState('');
    const searchChange = (event) => {
        setSearchCustomer(event.target.value)
        if (event.target.value.length === 0) {
            document.querySelector(".timesIcon").classList.remove("active");
        } else {
            document.querySelector(".timesIcon").classList.add("active");

        }
    }
    const clearInput = () => {
        setSearchCustomer("");
        document.querySelector("#customerSearchInput").value = "";
        document.querySelector(".timesIcon").classList.remove("active");


    }


    return (
        <div id="customerContent">
            <h1>My Customers</h1>
            <hr/>
            <div id="searchInputArea">
                <input type="text"
                       placeholder="Search Customer"
                       id="customerSearchInput"
                       onChange={searchChange}/>
                <BsSearch className="searchIcon"/>
                <GrClose className="timesIcon" onClick={clearInput}/>
            </div>
            <div className="customerListArea">
                <div className="customerDetailHeaders">
                    <span>Photo</span>
                    <span>Name</span>
                    <span>Company</span>
                    <span>Email</span>
                    <span>Balance</span>
                </div>
                {
                    dataJson
                        .filter((val) => {

                            let nameSearched    = val.name.toLowerCase().includes(searchCustomer.toLowerCase()),
                                companySearched = val.company.toLowerCase().includes(searchCustomer.toLowerCase()),
                                emailSearched   = val.email.toLowerCase().includes(searchCustomer.toLowerCase()),
                                balanceSearched = val.balance.toLowerCase().includes(searchCustomer.toLowerCase())

                            if (searchCustomer === "") {
                                return val
                            } else if ( nameSearched || companySearched || emailSearched || balanceSearched ) {
                                return val
                            }

                        })
                        .map((customer, key) => {
                            return (
                                <div key={key} className="customer-card">
                                    <img src={customer.picture} alt={customer.name}/>
                                    <span className="cHeader">Name</span>
                                    <span> {customer.name}</span>
                                    <span className="cHeader">Company</span>
                                    <span> {customer.company}</span>
                                    <span className="cHeader">E-mail</span>
                                    <span> {customer.email}</span>
                                    <span className="cHeader">Balance</span>
                                    <span> {customer.balance}</span>
                                </div>
                            )
                        })
                }
            </div>

        </div>
    );
}

export default App;