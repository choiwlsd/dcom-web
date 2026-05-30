type CardProps = {
  title: string;
  description?: string;
  onClick?: () => void;
};

const Card = ({ title, description, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-xl cursor-pointer hover:shadow-xl transition overflow-hidden"
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default Card;