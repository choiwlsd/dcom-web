import { useNavigate } from "react-router-dom";

const Page1 = () => {
    const navigate = useNavigate();

    return (
        <div className="p-20">
            <h1>게시판</h1>
            <p>This is the content for Page 1.</p>

            <div className="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">                
                <Post 
                    id={1} 
                    title="First Post" 
                    content="This is the content for the first post." 
                    onClick={(id) => navigate(`/post/${id}`)} 
                />
                <Post 
                    id={2} 
                    title="Second Post" 
                    content="This is the content for the second post." 
                    onClick={(id) => navigate(`/post/${id}`)} 
                />
            </div>
        </div>
    );
};

export default Page1;

const Post = ({
    id,
    title,
    content,
    onClick,
}: {
    id: number;
    title: string;
    content: string;
    onClick: (id: number) => void;
}) => (
    <div
        onClick={() => onClick(id)}
        className="border p-4 rounded cursor-pointer hover:shadow-md transition"
    >
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p>{content}</p>
    </div>
);
