import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../components/ui/utils/cn";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleStockSearch = async (e) => {
    e.preventDefault();
    if (!stockSymbol.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setStockData(null);

      const res = await fetch(
        `/api/stock/quote?symbol=${stockSymbol.toUpperCase()}`,
      );
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setStockData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="rounded-2xl max-w-md w-full mx-auto p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] bg-white border border-gray-100">
          <h2 className="font-bold text-xl text-neutral-800">
            Stock Price Tracker
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2">
            Welcome back, {currentUser?.username || "User"}!
          </p>

          <form onSubmit={handleStockSearch} className="my-8">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="stockSymbol">Stock Symbol</Label>
              <Input
                type="text"
                placeholder="AAPL, TSLA, GOOGL..."
                id="stockSymbol"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                required
              />
            </LabelInputContainer>

            <button
              disabled={loading}
              className="bg-linear-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            >
              {loading ? "Searching..." : "Search Stock"}
              <BottomGradient />
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          {stockData && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {stockData.symbol}
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Current Price:</span> $
                  {stockData.currentPrice}
                </p>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Opening Price:</span> $
                  {stockData.openPrice}
                </p>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">High:</span> $
                  {stockData.highPrice}
                </p>
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Low:</span> $
                  {stockData.lowPrice}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-md w-full mx-auto mt-4">
          <button
            onClick={handleSignOut}
            className="w-full px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
