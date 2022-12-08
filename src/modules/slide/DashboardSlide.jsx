/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { Search } from "@mui/icons-material";
import { debounce } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LeftOptionSlide from "../../components/layout/LeftOptionSlide";
import { createQuestion, createSlide, getAlllides } from "../../handleApi";
import { getCurrentUser } from "../../utils/constants";
import SlideList from "./SlideList";

function DashboardSlide() {
  const user = getCurrentUser();
  const [slideList, setSlideList] = useState([]);
  const [filter, setFilter] = useState("");
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const handleSetFilter = debounce(e => setFilter(e.target.value), 500);
  const handleCreateSlide = async text => {
    const res = await createSlide(text, "This is contentt", user.access_token);
    // await createQuestion(res.data?.id, user?.access_token);
    const newList = [res.data, ...slideList];
    setSlideList(newList);
  };
  const handleOnSelectAll = value => {
    setIsSelectedAll(value);
  };
  useEffect(() => {
    getAlllides(user.access_token).then(res => setSlideList(res.data.reverse()));
  }, []);
  return (
    <div className="p-8 px-10 flex-1 bg-gray-50">
      <div className="flex justify-between">
        <Search handleSetFilter={handleSetFilter} />
        <LeftOptionSlide handleCreateSlide={handleCreateSlide} isSelectedAll={isSelectedAll} />
      </div>
      {/* <GroupList groupList={groupList} isFetching={isFetching} /> */}
      <SlideList onSelected={handleOnSelectAll} listItem={slideList} setSlideList={setSlideList} />
    </div>
  );
}

export default DashboardSlide;
