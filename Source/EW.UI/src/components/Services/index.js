import React from "react";
import Title from "../Title";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
const Services = () => {
    const services = [
        {
            icon: <MdIcons.MdSecurity />,
            title: "Security",
            info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!",
        },
        {
            icon: <MdIcons.MdOutlineAvTimer />,
            title: "Quickly",
            info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!",
        },
        {
            icon: <AiIcons.AiOutlineSafety />,
            title: "Safe",
            info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!",
        },
        {
            icon: <AiIcons.AiOutlineBarChart />,
            title: "Convenience",
            info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!",
        },
    ];
    return (
        <section className="services">
            <Title title="services" />
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

export default Services;
