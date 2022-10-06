import React from 'react';
import './SearchResultRoot.css';
import { useParams } from 'react-router-dom'
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import UserSearchResults from './UserSearchResults/UserSearchResults';
function SearchResultRoot(props) {
    const { query } = useParams()
    const [tabValue, setTabValue] = React.useState(1)
    React.useEffect(() => {

    }, [])
    return (
        <div className='searchResultContainer'>
            <Routes>
                <Route path='/' element={<Navigate to="users" />} />
            </Routes>
            <div></div>
            <div className="mainSearchResultContainer">
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <h2 style={{
                        color: 'white',
                        fontWeight: '100',
                        margin: 0
                    }}>Search result for "{query}"</h2>
                </div>

                <div className="tabContainer" style={{
                    width: 'auto'
                }}>
                    <Link to={'users'} style={{ textDecoration: 'none' }}  >
                        <div className={`tabItem ${tabValue === 1 ? "active" : ""}  `}>
                            <p className="tabMenuText">Users</p>
                        </div>
                    </Link>
                    <Link to={'posts'} style={{ textDecoration: 'none' }}  >
                        <div className={`tabItem ${tabValue === 2 ? "active" : ""}  `}>
                            <p className="tabMenuText">Posts</p>
                        </div>
                    </Link>

                    <Link to={'Interests'} style={{ textDecoration: 'none' }}  >

                        <div className={`tabItem ${tabValue === 3 ? "active" : ""}  `}>
                            <p className="tabMenuText">Interest</p>
                        </div>
                    </Link>

                </div>

                <Routes>
                    <Route path='/users' element={<UserSearchResults query={query} />} />
                    <Route path='/' element={<Navigate to="users" />} />
                </Routes>
            </div>

            <div></div>
        </div>
    );
}

export default SearchResultRoot;