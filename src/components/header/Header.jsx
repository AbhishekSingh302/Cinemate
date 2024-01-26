import React, { useEffect, useState } from 'react';
import './Header.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

const Header = () => {

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavber = ()=>{
    if(window.scrollY>200){
      if(window.scrollY>lastScrollY && !mobileMenu){
        setShow("hide");
      }else{
        setShow("show")
      }
    }else{
      setShow("top")
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener('scroll', controlNavber)
    return ()=>{
      window.removeEventListener('scroll', controlNavber)
    }
  }, [lastScrollY])

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [location])

  const opensearch = ()=>{
    setMobileMenu(false);
    setShowSearch(true);
  }

  const openMobileMenu= ()=>{
    setMobileMenu(true);
    setShowSearch(false);
  }

  const searchQueryHandler = (e)=>{
    if(e.key === "Enter" && query.length>0){
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const navigationHandler = (type)=>{
    if(type === "movie"){
      navigate("/search/movie");
    }else{
      navigate("/search/tv");
    }
    setMobileMenu(false);
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <h1 className='logohead' onClick={()=> navigate('/')}>Cinemate</h1>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem searchIcon"><HiOutlineSearch onClick={()=>setShowSearch(true)}/></li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={()=> setShowSearch(true)}/>
          { mobileMenu ? <VscChromeClose onClick={()=> setMobileMenu(false)}/> : <SlMenu onClick={openMobileMenu}/>}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type="text" placeholder='search for a movie or tv show...' onChange={(e)=> setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
            <VscChromeClose onClick={()=> setShowSearch(false)}/>
          </div>
        </ContentWrapper>
      </div>
      )}
    </header>
  )
}

export default Header
