import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import PixelLogo from "../components/PixelLogo";
import { useAuth } from "../auth/AuthContext";
import {
  getUserProfile,
  getMyResults,
  type UserProfile,
  type ResultItem,
} from "../api/results";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [resultTotal, setResultTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageSize = 10;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Load profile data (once)
  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const profileData = await getUserProfile(user.id);
        if (cancelled) return;
        setProfile(profileData);
      } catch (e) {
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Failed to load profile";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Load results on page change
  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const loadResults = async () => {
      try {
        const data = await getMyResults(page, pageSize);
        if (cancelled) return;
        setResults(data.items);
        setResultTotal(data.total);
      } catch (e) {
        if (cancelled) return;
        const message =
          e instanceof Error ? e.message : "Failed to load results";
        setError(message);
      }
    };

    void loadResults();
    return () => {
      cancelled = true;
    };
  }, [user, page]);

  const totalPages = Math.ceil(resultTotal / pageSize);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAccuracy = (acc: number | null) => {
    if (acc === null) return "-";
    return `${Math.round(acc * 100)}%`;
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 font-mono">
      <PixelLogo />
      <ThemeToggle />

      {/* Navigation buttons */}
      <div className="fixed top-7 right-20 z-50 flex items-center gap-3">
        <Link to="/typing" className="pixel-button text-sm font-bold">
          Practice
        </Link>
        <Link to="/leaderboard" className="pixel-button text-sm font-bold">
          Leaderboard
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="pixel-button text-sm font-bold"
        >
          Log out
        </button>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 pt-24 pb-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-wider uppercase">
            My Profile
          </h2>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl animate-pulse text-slate-500">
              Loading...
            </div>
          </div>
        )}

        {error && (
          <div className="pixel-card border-red-500 text-red-500 text-center my-10">
            {error}
          </div>
        )}

        {!loading && !error && profile && (
          <>
            {/* User Info Card */}
            <div className="pixel-card mb-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div
                  className="w-24 h-24 bg-yellow-400 border-4 border-slate-800 dark:border-slate-100 flex items-center justify-center text-4xl font-black text-slate-900 shrink-0"
                  style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                >
                  {profile.username.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-1 uppercase tracking-wider">
                    {profile.username}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Joined {formatDate(profile.createdAt)}
                  </p>

                  {/* Quick Stats Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-sm font-bold">
                    <span>Total Games: {profile.stats.totalGames}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <StatCard
                label="Best WPM"
                value={profile.stats.bestWpm !== null ? String(profile.stats.bestWpm) : "-"}
                valueClass="text-yellow-600 dark:text-yellow-400"
              />
              <StatCard
                label="Best Accuracy"
                value={formatAccuracy(profile.stats.bestAccuracy)}
                valueClass="text-yellow-700 dark:text-yellow-300"
              />
              <StatCard
                label="Avg WPM"
                value={profile.stats.avgWpm !== null ? String(profile.stats.avgWpm) : "-"}
                valueClass="text-slate-700 dark:text-slate-200"
              />
              <StatCard
                label="Avg Accuracy"
                value={formatAccuracy(profile.stats.avgAccuracy)}
                valueClass="text-slate-600 dark:text-slate-300"
              />
            </div>

            {/* Results Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-wider uppercase text-center">
                Match History
              </h3>
            </div>

            <div className="w-full overflow-hidden">
              <div className="pixel-card p-0! overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 dark:bg-slate-700 border-b-4 border-slate-800 dark:border-slate-100">
                    <tr>
                      <th className="px-6 py-4 font-black uppercase text-sm">
                        Date
                      </th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right">
                        WPM
                      </th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right">
                        Accuracy
                      </th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right hidden sm:table-cell">
                        Correct
                      </th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right hidden md:table-cell">
                        Duration
                      </th>
                      <th className="px-6 py-4 font-black uppercase text-sm text-right hidden md:table-cell">
                        Mode
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700">
                    {results.map((r) => (
                      <tr
                        key={r.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(r.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">
                          {r.wpm}
                        </td>
                        <td className="px-6 py-4 text-right font-bold">
                          {Math.round(r.accuracy * 100)}%
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell text-slate-500">
                          {r.correctCount}/{r.totalCount}
                        </td>
                        <td className="px-6 py-4 text-right hidden md:table-cell text-slate-500">
                          {r.durationSec}s
                        </td>
                        <td className="px-6 py-4 text-right hidden md:table-cell">
                          <span className="inline-block px-2 py-0.5 border-2 border-slate-300 dark:border-slate-600 text-xs font-bold uppercase">
                            {r.mode}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {results.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-slate-500 italic"
                        >
                          No match records yet. Start practicing!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="pixel-button text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &lt; Prev
                  </button>

                  <span className="px-4 py-2 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-bold">
                    {page} / {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="pixel-button text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next &gt;
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* Pixel stat card component */
type StatCardProps = {
  label: string;
  value: string;
  valueClass?: string;
};

const StatCard = ({
  label,
  value,
  valueClass = "text-slate-800 dark:text-slate-100",
}: StatCardProps) => {
  return (
    <div className="pixel-card text-center">
      <div className={`text-3xl font-black mb-1 ${valueClass}`}>{value}</div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
};

export default ProfilePage;
