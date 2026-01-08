import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Thunks
import { listInventory } from '../../redux/asyncThunks/inventoryThunks';
import { createPizza } from '../../redux/asyncThunks/pizzaThunks';
import { addToCart } from '../../redux/slices/cartSlice';

// Components
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

/* ================= BASE PRICE BY SIZE (₹) ================= */
const SIZE_PRICE = {
  small: 199,
  medium: 299,
  large: 399,
  'extra-large': 499,
};

function UserCreateCustomPizzaScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState('Custom Pizza');
  const [description] = useState('Custom Pizza');
  const [imageUrl] = useState(
    'https://www.cicis.com/media/gvedawsa/pepperoni-pizza.png'
  );

  const [size, setSize] = useState('');
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);

  const [bases, setBases] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [veggies, setVeggies] = useState([]);

  const PizzaSizes = ['small', 'medium', 'large', 'extra-large'];

  const pizza = useSelector((state) => state.pizza);
  const {
    loading: pizzaLoading,
    pizzaInfo,
    pizzaCreateError,
    pizzaCreateSuccess,
  } = pizza;

  const inventory = useSelector((state) => state.inventory);
  const {
    loading: inventoryLoading,
    inventoryList,
    inventoryListError,
  } = inventory;

  const cart = useSelector((state) => state.cart);
  const { loading: cartLoading, cartAddItemError, cartAddItemSuccess } = cart;

  /* ================= PRICE HELPERS ================= */
  const toppingsPrice = (selectedIds, items) =>
    items
      ?.filter((item) => selectedIds.includes(item._id))
      .reduce((sum, item) => sum + item.price, 0) || 0;

  /* ================= AUTO PRICE CALC ================= */
  useEffect(() => {
    if (!size || !inventoryList) {
      setPrice(0);
      return;
    }

    const total =
      SIZE_PRICE[size] +
      toppingsPrice(bases, inventoryList.bases) +
      toppingsPrice(sauces, inventoryList.sauces) +
      toppingsPrice(cheeses, inventoryList.cheeses) +
      toppingsPrice(veggies, inventoryList.veggies);

    setPrice(total);
  }, [size, bases, sauces, cheeses, veggies, inventoryList]);

  /* ================= LOAD INVENTORY ================= */
  useEffect(() => {
    dispatch(listInventory());
  }, [dispatch]);

  /* ================= CREATE PIZZA ================= */
  const handleCreateCustomPizza = (e) => {
    e.preventDefault();

    dispatch(
      createPizza({
        name,
        description,
        bases,
        sauces,
        cheeses,
        veggies,
        price,
        size,
        imageUrl,
      })
    );
  };

  /* ================= ADD TO CART ================= */
  useEffect(() => {
    if (pizzaCreateSuccess && pizzaInfo?._id) {
      dispatch(addToCart({ id: pizzaInfo._id, qty: Number(qty) }));
    }
  }, [dispatch, pizzaCreateSuccess, pizzaInfo, qty]);

  useEffect(() => {
    if (cartAddItemSuccess) {
      navigate('/');
    }
  }, [cartAddItemSuccess, navigate]);

  /* ================= UI ================= */
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-16 pb-6 px-10 sm:px-16">
      <h1 className="text-4xl font-bold text-green-600 mt-6">
        Create Custom Pizza
      </h1>

      {cartLoading || pizzaLoading || inventoryLoading ? (
        <Loader />
      ) : (
        <div className="w-full mt-6 p-6 rounded-2xl shadow-lg bg-green-100">
          {(pizzaCreateError || inventoryListError || cartAddItemError) && (
            <Message>
              {pizzaCreateError ||
                inventoryListError ||
                cartAddItemError}
            </Message>
          )}

          <form
            onSubmit={handleCreateCustomPizza}
            className="w-full flex flex-col gap-4"
          >
            <input disabled value={name} className="input" />
            <input disabled value={description} className="input" />
            <input disabled value={imageUrl} className="input" />

            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
              className="input"
            >
              <option value="">Select Pizza Size</option>
              {PizzaSizes.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              disabled
              value={`₹ ${price}`}
              className="input font-bold"
            />

            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="input"
            />

            {/* Toppings */}
            {inventoryList &&
              Object.entries(inventoryList).map(([category, items]) => (
                <div key={category} className="bg-green-50 p-4 rounded">
                  <h2 className="font-bold text-green-600 mb-2">
                    {category.toUpperCase()}
                  </h2>
                  {items.map((item) => (
                    <label key={item._id} className="flex gap-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const setter = {
                            bases: setBases,
                            sauces: setSauces,
                            cheeses: setCheeses,
                            veggies: setVeggies,
                          }[category];

                          setter((prev) =>
                            e.target.checked
                              ? [...prev, item._id]
                              : prev.filter((id) => id !== item._id)
                          );
                        }}
                      />
                      {item.item} (₹{item.price})
                    </label>
                  ))}
                </div>
              ))}

            <Button
              type="submit"
              variant="secondary"
              className="rounded-full mt-4"
            >
              <FaPlus className="mr-2" />
              Create Pizza (₹{price})
            </Button>
          </form>
        </div>
      )}
    </section>
  );
}

export default UserCreateCustomPizzaScreen;
