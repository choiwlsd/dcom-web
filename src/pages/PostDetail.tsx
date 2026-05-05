import { useNavigate } from "react-router-dom";
import backImg from "../assets/back.png";

const PostDetail = () => {
    const navigate = useNavigate();

    return (
        <div className="p-20">           

        <div className="flex items-center gap-4">
            <img src={backImg} alt="Back" onClick={() => navigate(-1)} className="cursor-pointer size-4 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
        </div>

            <p>This is the detailed view of the post.</p>
        </div>
    );
};

export default PostDetail;