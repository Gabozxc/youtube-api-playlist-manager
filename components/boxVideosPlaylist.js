import axios from "axios";
import { useDrop } from "react-dnd";

import { itemTypes } from "./itemTypes";
import PreviewVideo from "./PreviewVideo";
import Loading from "./Loading";

const BoxVideosPlaylist = ({ subsList, loading, idPlaylist, setLoading }) => {

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: itemTypes.BOX,
    drop: async (e) => (
      setLoading(true),
      await axios.post("/api/addYoutubeVideoPlaylist", {
        withCredentials: true,
        idPlaylist,
        idVideo: e.idVideo,
      }),
      setLoading(false)
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <section
      ref={drop}
      role={"boxVideos"}
      className={` ${
        canDrop ? "border-blue-500  " : "rounded-lg  "
      } border flex items-baseline justify-center flex-wrap rounded-lg w-[95%] my-0 mx-auto mb-5`}
    >
      {subsList.length > 0 &&
        subsList?.map((sub) => (
          <PreviewVideo
            key={sub.id}
            title={sub.snippet.title}
            url={sub.snippet?.thumbnails?.high?.url}
          />
        ))}
    </section>
  );
};

export default BoxVideosPlaylist;
