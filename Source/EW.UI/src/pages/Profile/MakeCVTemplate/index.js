import React from "react";
import { Email, GitHub, LinkedIn, Phone, Place } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { profileSelector } from "../profile.slice";
import useAuth from "../../../hook/useAuth";
import moment from "moment";
import { Divider } from "@mui/material";
import PropTypes from "prop-types";

const styles = {
    article: {
        marginLeft: "1rem",
    },
};

const ProfileRender = ({ profile, fullName, language }) => {
    const objectiveText = language === "vi" ? "Mục tiêu" : "Objective";
    const skillText = language === "vi" ? "Kỹ năng" : "Skills";
    return (
        <>
            <div className="profile-contact__name">{fullName}</div>
            {profile?.address ? (
                <div className="d-flex profile-contact__row">
                    <div className="profile__icon">
                        <Place />
                    </div>

                    <div className="profile-contact__input">
                        {profile?.address}
                    </div>
                </div>
            ) : null}
            {profile?.github ? (
                <div className="d-flex profile-contact__row">
                    <div className="profile__icon">
                        <GitHub />
                    </div>
                    <div className="profile-contact__input">
                        {profile?.github}
                    </div>
                </div>
            ) : null}

            {profile?.linkedin ? (
                <div className="d-flex profile-contact__row">
                    <div className="profile__icon">
                        <LinkedIn />
                    </div>
                    <div className="profile-contact__input">
                        {profile?.linkedin}
                    </div>
                </div>
            ) : null}

            {profile?.emailContact ? (
                <div className="d-flex profile-contact__row">
                    <div className="profile__icon">
                        <Email />
                    </div>
                    <div className="profile-contact__input">
                        {profile?.emailContact}
                    </div>
                </div>
            ) : null}

            {profile?.phoneNumber ? (
                <div className="d-flex profile-contact__row">
                    <div className="profile__icon">
                        <Phone />
                    </div>
                    <div className="profile-contact__input">
                        {profile?.phoneNumber}
                    </div>
                </div>
            ) : null}

            {profile?.objective ? (
                <div className="profile-contact__row">
                    <div style={{ fontSize: "1.2rem" }}>{objectiveText}</div>
                    <div className="profile-contact__input">
                        {profile?.objective}
                    </div>
                </div>
            ) : null}
            {profile?.skills ? (
                <div className="profile-contact__row">
                    <div style={{ fontSize: "1.2rem" }}>{skillText}</div>
                    {profile?.skills}
                </div>
            ) : null}
        </>
    );
};

const WorkHistoryItemRender = ({
    companyName,
    isWorking,
    from,
    to,
    description,
    language,
}) => {
    const currentWorkingText = language === "vi" ? "Hiện tại" : "Current";
    return (
        <>
            <div>
                <div className="profile-work-history-item__company-name">
                    {companyName}
                </div>
                <em>
                    {moment(from).format("MM/YYYY")} -{" "}
                    {isWorking
                        ? currentWorkingText
                        : moment(to).format("MM/YYYY")}
                </em>
                <div style={styles.article}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

const WorkHistoryRender = ({ workHistory, language }) => {
    const workHistoryText =
        language === "vi" ? "Kinh nghiệm làm việc" : "Work History";
    return (
        <>
            <Divider />
            <div className="profile__header">{workHistoryText}</div>
            <div>
                {workHistory?.map((item) => (
                    <WorkHistoryItemRender
                        key={JSON.stringify(item)}
                        companyName={item?.companyName}
                        isWorking={item?.isWorking}
                        from={item?.from}
                        to={item?.to}
                        description={item?.description}
                        language={language}
                    />
                ))}
            </div>
        </>
    );
};

const EducationItemRender = ({ orgName, from, to, description }) => {
    return (
        <>
            <div>
                <div className="profile-work-history-item__company-name">
                    {orgName}
                </div>

                <em>
                    {moment(from).format("MM/YYYY")} -{" "}
                    {moment(to).format("MM/YYYY")}
                </em>
                <div style={styles.article}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

const EducationsRender = ({ educations, language }) => {
    const educationText = language === "vi" ? "Học vấn" : "Educations";
    return (
        <>
            <Divider />
            <div className="profile__header">{educationText}</div>
            <div>
                {educations.map((item) => (
                    <EducationItemRender
                        key={JSON.stringify(item)}
                        orgName={item.orgName}
                        from={item.from}
                        to={item.to}
                        description={item.description}
                    />
                ))}
            </div>
        </>
    );
};

const CertificateItemRender = ({ certificateName, from, to, description }) => {
    return (
        <>
            <div>
                <div className="profile-work-history-item__company-name">
                    {certificateName}
                </div>
                <em>
                    {moment(from).format("MM/YYYY")} -{" "}
                    {moment(to).format("MM/YYYY")}
                </em>
                <div style={styles.article}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

const CertificatesRender = ({ certificates, language }) => {
    const certificateText = language === "vi" ? "Chứng chỉ" : "Certificates";
    return (
        <>
            <Divider />
            <div className="profile__header">{certificateText}</div>
            {certificates.map((item) => (
                <CertificateItemRender
                    key={JSON.stringify(item)}
                    certificateName={item.certificateName}
                    from={item.from}
                    to={item.to}
                    description={item.description}
                />
            ))}
        </>
    );
};

const ProjectItemRender = ({
    projectName,
    customerName,
    from,
    to,
    description,
}) => {
    return (
        <>
            <div className="profile-work-history-item__company-name">
                {projectName}
                {" - "} {customerName}
            </div>
            <em>
                {moment(from).format("MM/YYYY")} -{" "}
                {moment(to).format("MM/YYYY")}
            </em>
            <div style={styles.article}>
                <div
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                ></div>
            </div>
        </>
    );
};

const ProjectsRender = ({ projects, language }) => {
    const projectText = language === "vi" ? "Dự án" : "Projects";
    return (
        <>
            <Divider />
            <div className="profile__header">{projectText}</div>
            {projects.map((item) => (
                <ProjectItemRender
                    key={JSON.stringify(item)}
                    projectName={item.projectName}
                    customerName={item.customerName}
                    from={item.from}
                    to={item.to}
                    description={item.description}
                />
            ))}
        </>
    );
};

/**
 * component MakeCVTemplate - create CV template from profile data
 * @param {object} param0
 * @param {string} param0.language
 * @example
 * <MakeCVTemplate language="vi" />
 */
const MakeCVTemplate = ({ language }) => {
    const { user } = useAuth();
    const { profile, workHistory, educations, certificates, projects } =
        useSelector(profileSelector);

    return (
        <div>
            <ProfileRender profile={profile} fullName={user?.given_name} />
            {workHistory && workHistory?.length > 0 ? (
                <WorkHistoryRender
                    workHistory={workHistory}
                    language={language}
                />
            ) : null}
            {educations && educations?.length > 0 ? (
                <EducationsRender educations={educations} language={language} />
            ) : null}
            {certificates && certificates?.length > 0 ? (
                <CertificatesRender
                    certificates={certificates}
                    language={language}
                />
            ) : null}
            {projects && projects?.length > 0 ? (
                <ProjectsRender projects={projects} language={language} />
            ) : null}
        </div>
    );
};

MakeCVTemplate.defaultProps = {
    language: "vi",
};
MakeCVTemplate.propTypes = {
    language: PropTypes.string,
};
MakeCVTemplate.displayName = "MakeCVTemplate";
export default MakeCVTemplate;
