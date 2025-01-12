const StatCard = ({
  icon: Icon,
  title,
  value,
  change,
}: {
  icon: any;
  title: string;
  value: string | number;
  change: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        <p className="text-emerald-500 text-sm mt-2">{change}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </div>
);

export default StatCard;
