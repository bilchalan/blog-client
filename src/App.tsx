import { Routes, Route } from 'react-router-dom';
import Mainlayout from './features/common/layouts/Main.layout';
import Posts from './features/post/pages/Posts';
import Auth from './features/auth/pages/Auth';
import { selectTheme } from './features/common/slice/themeSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { authApi } from './features/auth/api/authApi';
import CreateCategory from './features/category/pages/CreateCategory';
import ProtectedRoute from './features/protected/ProtectedRoute';
import Unauthorized from './features/common/pages/Unauthorized';
import CreateTag from './features/tag/pages/CreateTag';
import UpdateUserRoles from './features/auth/pages/UpdateUserRoles';
import CreatePost from './features/post/pages/CreatePost';
import ApprovePost from './features/post/pages/ApprovePost';
import Search from './features/post/pages/Search';
import PostDetails from './features/post/pages/PostDetails';
import About from './features/common/pages/About';
function App() {
  const { dark } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authApi.endpoints.me.initiate());
  }, []);

  return (
    <div className={`App ${dark ? 'dark' : ''}`}>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route index element={<Posts />} />
          <Route path="auth" element={<Auth />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="search" element={<Search />} />
          <Route path="posts/:id" element={<PostDetails />} />
          <Route path="/about" element={<About />} />

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="users/role" element={<UpdateUserRoles />} />
            <Route path="approve" element={<ApprovePost />} />
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={['admin', 'author']} />}
          >
            <Route path="create-tag" element={<CreateTag />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['author']} />}>
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
