// user-display.ts

type Props = {
  user: {
    studentNumber: string;
    username: string;
  };
};

export default function UserDisplayName({ user }: Props) {
  return (
    <span className="flex flex-row items-center">
      <div className="bg-slate-200 font-bold shadow-sm p-1 m-1 h-7 flex items-center">
        {user.studentNumber.slice(0, 2)}
      </div>
      {user.username}
    </span>
  );
}