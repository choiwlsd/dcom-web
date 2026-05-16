import { posts } from "../data/post";

const Home = () => {
    return (
        <div className="p-20"> 
            <h1>Home</h1>
            <div className="mt-10 grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">   

                {/* 활동요약 */}
                <div className="border p-6 rounded shadow-sm bg-white">
                    <h2 className="text-xl font-bold mb-4">활동요약</h2>
                    
                    <div className="space-y-3">
                        {posts.map(post => (
                            <div key={post.id} className="border p-4 rounded">
                                <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>{post.author}</span>
                                    <span>{post.date}</span>
                                </div>                    
                            </div>
                        ))}
                    </div>
                </div>

                {/* 공지사항 */}
                <div className="border p-6 rounded shadow-sm bg-white">
                    <h2 className="text-xl font-bold mb-4">공지사항</h2>
                </div> 
            </div>
        </div>
    );
};

export default Home;
