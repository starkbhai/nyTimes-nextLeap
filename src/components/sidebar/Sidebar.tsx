import React, { useState } from "react";
import "./sidebar.css";
import nextImg from "../../assets/icons/next.png";
import nyLogo from "../../assets/img/ny_logo.png"

interface SidebarProps {
  setShowSideBar: (value: boolean) => void;
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ setShowSideBar, showSidebar }) => {
  const [isInputFocused, setInputFocus] = useState(false);
    const [searchQuery , setSearchQuery]=useState<string>('');

      const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchQuery(e.target.value)
    }

  const sidebarArr = [
    { SidebarVal: "HomePage", subSideBarVal: [] },
    {
      SidebarVal: "World",
      subSideBarVal: [
        "Africa",
        "Australia",
        "Americas",
        "Asia Pacific",
        "Canada",
        "Europe",
        "Middle East",
      ],
    },
    {
      SidebarVal: "Business",
      subSideBarVal: [
        "DealBook",
        "Economy",
        "Energy",
        "Markets",
        "Mutual Funds",
        "Media",
        "small Business",
        "Your Money",
        "Automative",
      ],
    },
    {
      SidebarVal: "U.S Politics",
      subSideBarVal: [
        "President Biden",
        "Donald Trump",
        "2024 Election",
        "Suprime Court",
        "Congress",
      ],
    },
    {
      SidebarVal: "U.S News",
      subSideBarVal: [
        "Education",
        "California Today",
        "Race/Related",
        "WildFire Tracker",
      ],
    },
    {
      SidebarVal: "Sports",
      subSideBarVal: [
        "MLB",
        "NBA",
        "NFL",
        "NHL",
        "NCAA Basketball",
        "NCAA Football",
        "Golf",
        "Soccer",
        "Tennis",
      ],
    },
     { line: true },
    { SidebarVal: "Listings & More", subSideBarVal: ["Reader Center" ,"Podcasts" ,"The Athletic" ,"Video","Wirecutter" , "Graphic","Cooking","TimeMachine","Headway","Time Store" ,"Live Events","Manage My","The Learning","Account","NYTLicensing","Tool & Services"] },
  ];
   
  return (
    <>
      <div
        className={`sidebar-wrapper`}>

          <div className="head-div">
           <div className='nylogo-div'><img src={nyLogo} alt="nytLogo" className='nylogo' /></div>
          <svg onClick={()=>setShowSideBar(false)} className="cross-icon" viewBox="0 0 12 12" stroke="#000" strokeWidth="1" strokeLinecap="round" style={{opacity: "0.95"}}><line x1="11" y1="1" x2="1" y2="11"></line><line x1="1" y1="1" x2="11" y2="11"></line></svg>
          </div>
        
           <form action="" className='search-form'>
            <div className={`search-input-div ${isInputFocused ? 'div-focus' : ''}`} >
            <input id="search-input" type="text" className='search-input' value={searchQuery ? searchQuery : ''} onChange={handleOnChange} placeholder='SEARCH' onFocus={()=>setInputFocus(true)}
                onBlur={()=>setInputFocus(false)} />
        
            <input id="search-reset" className="search-clear" type="reset" value="Clear" onClick={()=>{setSearchQuery('')}} />
            </div>
            <button type='submit' className='submit-button'>GO</button>
           </form>
        
        {sidebarArr?.map((val, idx) => (
          <>
          <div key={`ok-87${idx}o098`} className="sidebar-val">
            {val?.line ? (
              <p>line</p>
            ) : (
              <>
                <p>{val?.SidebarVal}</p>
                <img className="icon-size" src={nextImg} alt="next" />
              </>
            )}  
          </div>
          
          <div key={`9uy${idx}986`} className="sidebar-val-responsive">
           
           <ul className="ul-wrapper">
            <li className="head-text li-item">{val?.SidebarVal}</li>
            {val?.subSideBarVal?.map((v,idx)=>(
              <li className="li-item" key={idx}>{v}</li>
            ))}
            </ul>
          </div>
          </>
        ))}
       
      </div>
      
    </>
  );
};

export default Sidebar;
