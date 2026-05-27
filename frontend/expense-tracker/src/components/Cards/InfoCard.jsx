const InfoCard = ({ title, value }) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-purple-600"></div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-xl font-semibold">${value}</h2>
        </div>
      </div>
    );
  };
  
  export default InfoCard;