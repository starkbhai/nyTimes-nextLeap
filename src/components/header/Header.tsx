import React, { useState } from 'react';
import './header.css';
import hburger from '../../assets/icons/hamburger.png'
import searchIcon from '../../assets/icons/magnifying-glass.png'
import nyLogo from '../../assets/img/ny_logo.png'
import {Link} from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';

interface SidebarProps {
  setShowSideBar: (value: boolean) => void;
  showSidebar: boolean;
}

const Header: React.FC<SidebarProps> = ({setShowSideBar, showSidebar}) => {
    const [isInputFocused, setInputFocus] = useState(false);
    const [searchQuery , setSearchQuery]=useState<string>('');
    const [showSearch , setShowSearch]=useState<boolean>(false);
    const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(e.target.value)
    }
    
    console.log("showSearch : ", showSearch);
  return (
   <>
    
   
    <header className="nyt-header"  >
      
     <div className='header-1'>
        <div onClick={()=>setShowSideBar(!showSidebar)} className='hamburger-div'><img src={hburger} alt="hamBurger" /></div>
        <div className='searchicon-div' ><div className={` ${showSearch ? "search-img" : "search-img-w" }`} onClick={()=>{setShowSearch((prev)=>!prev)}}><img src={searchIcon} alt="searchIcon" className='search-icon' /></div> 
        {showSearch && 
           <form action="" className='search-form1'>
            <div className={`search-input-div ${isInputFocused ? 'div-focus' : ''}`} >
            <input id="search-input" type="text" className='search-input' value={searchQuery ? searchQuery : ''} onChange={handleOnChange} placeholder='SEARCH' onFocus={()=>setInputFocus(true)}
                onBlur={()=>setInputFocus(false)} />
                {searchQuery && 
            <input id="search-reset" className="search-clear" type="reset" value="Clear" onClick={()=>{setSearchQuery('')}} />}
            </div>
            <button type='submit' className='submit-button'>GO</button>
           </form> }
        </div>
        <h4 className='page-tag'>WORLD NEWS</h4> 
        
     </div>
     <div className="header2">
      <div className='nylogo-div'><img src={nyLogo} alt="nytLogo" className='nylogo' /></div>
     </div>

     <div className="header3">
        <div><Link className='link' to="#">PLAY SPELLING BEE</Link></div>
        <div><Link className='link' to="#">LOGIN</Link></div>
     </div>
     <svg className='user-icon' viewBox="0 0 20 20" fill="#333" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14.2379 6C14.2379 8.20914 12.4471 10 10.2379 10C8.02878 10 6.23792 8.20914 6.23792 6C6.23792 3.79086 8.02878 2 10.2379 2C12.4471 2 14.2379 3.79086 14.2379 6Z" fill="#333"></path><path d="M16.2355 14.5714C16.2371 14.5477 16.2379 14.5239 16.2379 14.5C16.2379 13.1193 13.5516 12 10.2379 12C6.92421 12 4.23792 13.1193 4.23792 14.5C4.23792 14.5239 4.23872 14.5477 4.24032 14.5714H4.23792V18H16.2379V14.5714H16.2355Z" fill="#333"></path></svg>
    </header>
   
    {showSidebar && 
      <Sidebar setShowSideBar={setShowSideBar} showSidebar={showSidebar}/>}
    </>
  );
};

export default Header;
