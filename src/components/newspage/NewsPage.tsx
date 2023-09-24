import React, { useCallback, useEffect, useState } from 'react'
import Header from '../header/Header'
import './newspage.css'
import Footer from '../footer/Footer';
import Loading from '../helpComponents/Loading';

// Define an interface for the API response data
interface NewsData{
   status:string,
   copyright:string,
   section:string,
   last_update:string,
   num_results:number;
   results:NewsItem[];
}

interface NewsItem{
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: Multimedia[];
  short_url: string;
};

interface Multimedia{
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

const NewsPage:React.FC = () => {
const [showSidebar , setShowSideBar]=useState<boolean>(false);
const [latest , setLatest]=useState<boolean>(false);
const [worldNewsData , setWorldNewsData]=useState<NewsData | null>(null);
const [sliced , setSliced]=useState<number>(19);
const [loading , setLoading]=useState<boolean>(false);
const [error , setError]=useState<string | null>(null);
useEffect(()=>{
   setLoading(true);
 fetch("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=BNqIRWMGYzF8JPlHgv5pWOlPvsbW6Fly")
 .then((response )=>{
   if (!response.ok) {
      // Handle HTTP error (e.g., 404 Not Found)
      throw new Error("Network response was not ok");
    }
   return response.json();
 })
 .then((data)=>{setWorldNewsData(data); setLoading(false);}) .catch((error) => {
   // Handle any errors that occurred during the fetch
   setError(error.message);
   // Optionally, you can set an error state or display an error message to the user.
 });
},[])



  // infinite scroll function
  const handleInfiniteScroll = useCallback(() => {
  const scroller = document.querySelector<HTMLDivElement>("#scroller");
  console.log("hadleInfiniteScroller : " , scroller);
   if(scroller){
      const scrollTop = scroller.scrollTop;
      const scrollHeight =scroller.scrollHeight; // return entire height your page 1612
      const clientHeight = scroller.clientHeight; //311
      console.log("woring 1 level" , scrollTop);
    try {
        if (
          worldNewsData?.num_results !== undefined && worldNewsData?.num_results <= sliced &&
          clientHeight + scrollTop >= scrollHeight
        ) {
          console.log("woring 2 + level");
          setSliced((prev)=>prev + 5);
        }
      } catch (error) {
        console.log("error infinite --> ", error);
      }
   }else {
      console.error("#scroller element not found.");
    }
    
  }, [sliced]);


   useEffect(() => {
      console.log("infinite-useEffect");
      document.querySelector<HTMLDivElement>("#scroller")
         ?.addEventListener("scroll", handleInfiniteScroll);

      return () =>
         document.querySelector<HTMLDivElement>("#scroller")
         ?.removeEventListener("scroll", handleInfiniteScroll);
   }, [sliced]);



 function MouseOver(event:React.MouseEvent<HTMLDivElement>) {
    // (event.target as HTMLDivElement).style.background = "yellow";
    setShowSideBar(false)
   }
  
   const timeAgo=(previousTime:string):string=>{
         const parsedTimestamp:any  = new Date(previousTime);
         const currentTime:any  = new Date();

         const timeDifferenceMs:number = currentTime - parsedTimestamp;
         const timeDifferenceHours:number = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
            if (timeDifferenceHours === 0) {
                return 'Less than an hour ago';
            } else {
               return `${timeDifferenceHours} ${timeDifferenceHours === 1 ? 'hour' : 'hours'} ago`;
            }
   }

   const monthNames: string[] = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.',
    'May', 'June', 'July', 'Aug.',
    'Sept.', 'Oct.', 'Nov.', 'Dec.'
  ];

  // * convert Date to monthname date and year format
   const getFullDate=(val:string)=>{
        const dateFormated:any = new Date(val);
         const month = monthNames[dateFormated?.getMonth()];
         const day = dateFormated?.getDate();
         const year = dateFormated?.getFullYear();
         return `${month} ${day} ${year}`
   }


  return (
    <div style={{width:"100vw"}} id='scroller'>
    <Header setShowSideBar={setShowSideBar} showSidebar={showSidebar} />
    <div className='pad' onMouseOver={MouseOver}>
      <header>
       <h1 className='tag-header'>World News</h1>
       <nav className='navbar'>
       <ol className='news-navbar'> 
       <li >AFRICA</li>
       
       <li>AMERICAS</li>
       <li>ASIA</li>
       <li>AUSTRALIA</li>
       <li>CANADA</li>
       <li>EUROPE</li>
       <li>MIDDLE EAST</li>
       </ol>
       </nav>
       </header>
    
       
      {loading ? <Loading /> :

          error ? 
            <div className="error-alert">
               <p>Error: {error}</p>
            </div> :
      <>
       <div className='f-grid'>
         {worldNewsData?.results?.slice(0,1)?.map((news,idx)=>(
            <div key={`ksju${idx+1}98`} className='g-one' >
               <div className='g-one-img-div'><img src={news?.multimedia[0]?.url} alt={news?.multimedia[0]?.caption} /></div>
               <div className='grid-desc'>
                  <a href={news?.url} className='grid-desc-head'>{news?.title}</a>
                  <p className='grid-desc-p'>{news?.abstract}</p>
                  <p className='grid-desc-time'>{timeAgo(news?.published_date)}</p>
               </div>
          </div>

         ))}
         {worldNewsData?.results?.slice(1,2)?.map((news,idx)=>(
            <div key={`iur7u${idx+1}kf8`}  className='g-one' >
            <div className='g-one-img-div'><img  src={news?.multimedia[1]?.url} alt={news?.multimedia[1]?.caption} /></div>
               <div className='grid-desc'>
               <a href={news?.url} className='grid-desc-head'>{news?.title}</a>
                  <p className='grid-desc-p'>{news?.abstract}</p>
                  <p className='grid-desc-time'>{timeAgo(news?.published_date)}</p>
               </div>
          </div>

         ))}

           <div className='grid-sub' >
             {worldNewsData?.results?.slice(2,4)?.map((news,idx)=>(
            <div key={`kd7${idx}09i`} className='g-sub-child add-b'> 
             <div className='g-one-img-div-sub'>
               <img src={news?.multimedia[1]?.url} alt={news?.multimedia[1]?.caption} /></div>
               <div className='grid-desc'>
                <a href={news?.url} className='grid-desc-head'>{news?.title}</a>
                  <div className='desc-img'>
                     <span className='grid-desc-p'>{news?.abstract}</span>
                     <div className='desc-img-div'><img  src={news?.multimedia[1]?.url} alt={news?.multimedia[1]?.caption} /></div>
                  </div>
                  <p className='grid-desc-time'>{timeAgo(news?.published_date)}</p>
               </div>
            </div>
            ))}
           </div>
       </div>
         
         <div className='s-grid'>
            {worldNewsData?.results?.slice(4,9)?.map((news,idx)=>(
                  <div className='s-grid-child' key={`kdk${idx}-04`}>
                     <div  className='s-one-img-div'><img src={news?.multimedia[1]?.url} alt={news?.multimedia[1]?.caption} /></div>
                     <div className='s-text'>
                         <a className='p-a' href={news?.url}>{news?.title}</a>
                        <p className='s-text-p'>{news?.abstract}</p>
                     </div>
                  </div>
               ))}
         </div>

         <div className='s-grid'>
            {worldNewsData?.results?.slice(9,14)?.map((news,idx)=>(
                  <div className='s-grid-child' key={`k873${idx}-2o0`}>
                     <div  className='s-one-img-div'><img src={news?.multimedia[1]?.url} alt={news?.multimedia[1]?.caption} /></div>
                     <div className='s-text'>
                        <a href={news?.url} className='p-a'>{news?.title}</a>
                        <p className='s-text-p'>{news?.abstract}</p>
                     </div>
                  </div>
               ))}
         </div>
       
      

       <div className='third'>
           <div className='th-search'>
              <h2 className={`${!latest ? "add-b-class" : "h2-c"}`} onClick={()=>setLatest(false)}>Latest</h2>
              <div className={`t-s-parent ${latest ? "add-b-class" : ""}`} onClick={()=>setLatest(true)}>
                <svg className="s-search" viewBox="0 0 16 16"><path fill="var(--color-content-secondary,#363636)" d="M11.3,9.2C11.7,8.4,12,7.5,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1,0,1.9-0.3,2.7-0.7l3.3,3.3c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L11.3,9.2zM6.5,10.3c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C10.3,8.6,8.6,10.3,6.5,10.3z"></path></svg>
                <form action="" className='f-search'>
                  <input type="text" id="search-tab-input" className={`search-input-t ${latest ? "" :"search-input-t-a"}`} placeholder="Search" aria-labelledby="search-tab-label"  autoComplete="off" />
                </form>
              </div>
           </div>
          
          {latest && 
           <div className='results'>
              <p>379792 results sorted by</p>
              <select id="sort-filter" autoComplete="false" data-search="sort">
                <option value="newest">newest</option>
                <option value="oldest">oldest</option>
              </select>
           </div> }
         
          {worldNewsData?.results?.slice(15)?.map((news,idx)=>(
            <div key={`lj7${idx}lk6d`} className='t-grid'>
                 <div className='t-date-wrapper'>
                      <p className='t-date'>{getFullDate(news?.published_date)}</p>
                      <div className='a-text'>
                         <a href={news?.url} className='last-a'>{news?.title}</a>
                         <p className='a-text-p'>{news?.abstract}</p>
                         <p className='a-text-name'>{news?.byline}</p>
                      </div>
                 </div>
                 
                 <div className='t-grid-img'>
                    <img src={news?.multimedia[1]?.url} alt={news?.multimedia[1]?.caption} />
                 </div>
            </div>
          ))}
            {/* <div className='t-grid'>
                 <div className='t-date-wrapper'>
                      <p className='t-date'>Sept. 15, 2023</p>
                      <div className='a-text'>
                         <h3>In Libya, a Grim Struggle to Bury the Dead From Devastating Floods</h3>
                         <p className='a-text-p'>An aid worker said hundreds of bodies at a time were being placed in mass graves. Thousands died in the floods that hit the northeast of the country last weekend.</p>
                         <p className='a-text-name'>Aaron Boxerman</p>
                      </div>
                 </div>
                 <div className='t-grid-img'>
                    <img src="https://static01.nyt.com/images/2023/09/15/multimedia/15libya-flood-01-fgwt/15libya-flood-01-fgwt-superJumbo.jpg?quality=75&auto=webp" alt="img" />
                 </div>
            </div> */}
       </div>
    

     <Footer />
        </> }
    </div>
    </div>
  )
}

export default NewsPage
