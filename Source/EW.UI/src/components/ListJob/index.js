import { Typography } from "@mui/material";
import { array } from "prop-types";
import React from "react";
import JobItem from "../JobItem";

/**
 * Render list job
 * @param {object} object
 * @param {Array} object.posts list post to render
 * @example
 * <ListJob posts={posts}/>
 */
const ListJob = ({ posts }) => {
    return (
        <div>
            {posts?.length === 0 ? (
                <Typography variant="h6">Hiện đang không tuyển dụng</Typography>
            ) : (
                <>
                    <Typography variant="h6">
                        Hiện đang có {posts?.length} công việc đang tuyển
                    </Typography>
                    <br />
                    {posts?.map((item) => (
                        <JobItem
                            key={JSON.stringify(item)}
                            id={item.id}
                            jobTitle={item.jobTitle}
                            salaryType={item.salaryType}
                            salaryFrom={item.salaryFrom}
                            salaryTo={item.salaryTo}
                            currency={item.currency}
                            techStacks={item.techStacks}
                            avatarUrl={item.avatarUrl}
                            jobDescription={item.jobDescription}
                            updatedDate={item.updatedDate}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

ListJob.propTypes = {
    posts: array.isRequired,
};

ListJob.displayName = "ListJob";
export default ListJob;
