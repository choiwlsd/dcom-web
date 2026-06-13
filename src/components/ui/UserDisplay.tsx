// user-display.ts

type Props = {
  user: {
    studentNumber: string;
    userID: string;
  };
};

export default function UserDisplayName({ user }: Props) {
  return (
    <span className="flex flex-row items-center text-sm">
      <div className="bg-slate-200 font-bold text-xs shadow-sm p-1 m-1 w-6 h-6 flex items-center">
        {user.studentNumber.slice(0, 2)}
      </div>
      {user.userID}
    </span>
  );
}