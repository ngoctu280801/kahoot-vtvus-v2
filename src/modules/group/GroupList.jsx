/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router";
import uuid from "react-uuid";
import { JOINED, OWNED } from "../../utils/constants";
import GroupItem from "./GroupItem";
import GroupItemSkeleton from "../../components/skeleton/GroupItemSkeleton";

function GroupList({ groupList, isFetching }) {
  return (
    <div className="grid grid-cols-4 gap-4 mt-10">
      {groupList.length &&
        isFetching === false &&
        groupList?.map(item => (
          <GroupItem
            key={item.group_id}
            id={item.group_id}
            to={`/groups/${item.group_id}/members`}
            groupName={item.group_name}
          />
        ))}

      {isFetching && new Array(12).fill(0).map(() => <GroupItemSkeleton key={uuid()} />)}

      {groupList.length <= 0 && isFetching === false && (
        <div className="w-full h-full flex justify-center items-center mt-[200px]">
          <h2 className="text-4xl font-bold text-gray-400">There is no group here</h2>
        </div>
      )}
    </div>

    // <div>
    //   {groupList.length > 0 ? (
    //     <div className="grid grid-cols-4 gap-4 mt-10">
    //       {groupList?.map(item => (
    //         <GroupItem
    //           key={item.group_id}
    //           id={item.group_id}
    //           to={`/groups/${item.group_id}/members`}
    //           groupName={item.group_name}
    //         />
    //       ))}
    //     </div>
    //   ) : (
    //     <div className="w-full h-full flex justify-center items-center mt-[200px]">
    //       <h2 className="text-4xl font-bold text-gray-400">There is no group here</h2>
    //     </div>
    //   )}
    // </div>
  );
}

export default GroupList;
