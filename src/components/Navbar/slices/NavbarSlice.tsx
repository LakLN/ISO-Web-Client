import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerVisible: false,
  items: [
    {
      name: "Về NTTC",
      url: "/about-nttc",
      subItems: [
        {
          name: "Giới thiệu NTTC",
          url: "/about-nttc",
        },
      ],
    },
    {
      name: "Về ISO 17024",
      url: "/about",
      subItems: [
        {
          name: "Giới thiệu ISO 17024",
          url: "/about",
        },
      ],
    },
    {
      name: "Hồ sơ Chuyên gia - Giảng viên",
      url: "/blog",
      subItems: [
        {
          name: "Hồ sơ Chuyên gia",
          url: "/blog",
        },
        {
          name: "Hồ sơ Giảng viên",
          url: "/blog-giang-vien",
        },
      ],
    },
    {
      name: "Tiêu chuẩn kĩ năng",
      url: "/contact",
      subItems: []
    },
    {
      name: "Chứng nhận",
      url: "/contact",
      subItems: []
    },
    {
      name: "Tin tức",
      url: "/contact",
      subItems: []
    },
    {
      name: "Sự kiện",
      url: "/contact",
      subItems: []
    },
    // {
    //   name: "Pages",
    //   url: "/pages",
    //   subItems: [
    //     {
    //       name: "About Page",
    //       url: "/about",
    //     },
    //     {
    //       name: "Contact Page",
    //       url: "/contact",
    //     },
    //     {
    //       name: "Blog Grid Page",
    //       url: "/blog",
    //     },
    //     {
    //       name: "Blog Sidebar Page",
    //       url: "/blog-sidebar",
    //     },
    //     {
    //       name: "Blog Details Page",
    //       url: "/blog-details",
    //     },
    //     {
    //       name: "Error Page",
    //       url: "/error",
    //     },
    //   ],
    // },
  ],
  menu: {
    visible: false,
  },
};

const NavbarSlice = createSlice({
  name: "Navbar",
  initialState,
  reducers: {
    setNavbarDrawerVisible: (state, action) => {
      state.drawerVisible = action.payload;
    },
    setNavbarMenu: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setNavbarDrawerVisible, setNavbarMenu } = NavbarSlice.actions;

export default NavbarSlice.reducer;
