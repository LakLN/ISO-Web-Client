import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsYoutube,
  BsFillCartCheckFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import Container from "../Container/Container";
import "./styles/Footer.css";

export default function Footer() {
  return (
<div className={classNames("footer-wrapper bg-gray-950 text-white")}>
  <Container className={"footer-container"}>
    <div
      className={classNames(
        "flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-white",
      )}
    >
      <div>
        <h3
          className={classNames(
            "text-white py-2 md:px-0 text-xl font-semibold leading-28 tracking-wide capitalize",
          )}
        >
          Trường Trung Cấp Nguyễn Tất Thành.
        </h3>
      </div>
      <div className={classNames("text-zinc-300 text-base leading-6")}>
        <ul
          className={classNames("flex flex-col md:flex-row-reverse gap-6")}
        >
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
          <li>
            <Link to="/about">Giới thiệu</Link>
          </li>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="py-5">
      <div className="text-white text-base font-semibold leading-6">
        <div className={classNames("flex flex-col md:flex-row md:items-center justify-between")}>
          <h3 className="mb-2 text-base font-medium leading-relaxed text-body-color">
            <strong>Địa chỉ:</strong> 306 Nguyễn Oanh, Phường 17, Quận Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam.
          </h3>
          <ul className="flex flex-col md:flex-row-reverse gap-6">
            <Link to="https://www.youtube.com/@truongtrungcapnguyentattha5645">
              <BsYoutube className="text-2xl text-white" />
            </Link>
            <Link to="https://www.facebook.com/tcntt" className="mr-2">
              <BsFacebook className="text-2xl text-white" />
            </Link>
          </ul>
        </div>
        <p className="mb-2 text-base font-medium leading-relaxed text-body-color">
          <strong>Hotline:</strong> +84 906866695
        </p>
        <p className="mb-2 text-base font-medium leading-relaxed text-body-color">
          <strong>Email:</strong> nguyentatthanhtc@gmail.com
        </p> 
      </div>
    </div>
  </Container>
</div>
);
}