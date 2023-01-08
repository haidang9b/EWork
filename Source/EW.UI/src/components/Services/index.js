import React from "react";
import Title from "../Title";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
const Services = () => {
    const services = [
        {
            icon: <FaIcons.FaCoins />,
            title: "Free cost",
            info: "EWork là một ứng dụng hoàn toàn miễn phí, nó cho phép các doanh nghiệp và sinh viên có thể sử dụng. Là công cụ tìm kiếm nhân tài để bạn tập trung vào các chiến lược kinh doanh cốt lõi.",
        },
        {
            icon: <MdIcons.MdOutlineAvTimer />,
            title: "Quickly",
            info: "Là ứng dụng do sinh viên khoa Công nghệ thông tin trường ĐH Tôn Đức Thắng phát triển nhằm mục đích hỗ trợ doanh nghiệp cũng như sinh viên khoa tìm kiếm được việc làm nhanh nhất có thể.",
        },
        {
            icon: <AiIcons.AiOutlineSafety />,
            title: "Security Guaranteed",
            info: "Dữ liệu và tài nguyên của bạn được đảm bảo an toàn 100% với chính sách bảo mật nghiêm ngặt của chúng tôi theo các tiêu chuẩn quốc tế như khung ISO 27001, ISO 9001 và CMMi cấp 3.",
        },
        {
            icon: <AiIcons.AiOutlineBarChart />,
            title: "Convenience",
            info: "Các chức năng của EWork hỗ trợ người dùng có thể sử dụng hiệu quả và đạt kết quả tốt nhất. Với giao diện tiện lợi và thân thiện, giúp mọi loại người dùng dễ dàng sử dụng",
        },
    ];
    return (
        <section className="services">
            <Title title="services" />
            <div className="divider"></div>
            <div className="services-center">
                {services.map((item, index) => {
                    return (
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h5>{item.title}</h5>
                            <p>{item.info}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};
Services.displayName = "Services";
export default Services;
