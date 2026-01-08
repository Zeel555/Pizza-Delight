import PropTypes from 'prop-types';

function InventoryTable({ title, items }) {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </h2>
      <table className="bg-green-200 w-full table-auto border-collapse border-2 border-green-300 rounded-lg text-center overflow-hidden whitespace-no-wrap">
        <thead className="bg-green-200 h-10 uppercase font-bold">
          <tr>
            <th>Stock Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody className="bg-green-100 text-green-800">
          {items.map((item) => (
            <tr key={item._id}>
              <td className="border border-green-300 px-4 py-2 sm:px-2 sm:py-1">
                {item.item}
              </td>
              <td className="border border-green-300 px-4 py-2 sm:px-2 sm:py-1">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

InventoryTable.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InventoryTable;
