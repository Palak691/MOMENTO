import { FeedFilter } from '../components/feedFilter/FeedFilter'
import { Navbar } from '../components/navbar/Navbar'
import { CreatePosts } from '../components/createPosts/CreatePosts'
import { AllFeeds } from '../components/Feeds/AllFeeds'
import { useSelector } from 'react-redux'
export const Home = () => {
  const {token} =  useSelector((state)=>state.auth)
  return (
    <div>
    <Navbar/>
    {token && <CreatePosts/>}
    <FeedFilter/>
    <AllFeeds/>
    </div>
  )
}

