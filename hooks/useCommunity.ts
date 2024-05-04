import { Community, User } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import api from "@/lib/api";

export function useCommunity() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { token, user } = useAuth();

    useEffect(() => {
        const loadCommunity = async () => {
            setCommunities([]);
            try {
                setLoading(true);
                const res = await api.get(
                    "/users/communities/1?announcements=true&members=true&admins=true",
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await res.data;

                if (data.error) {
                    throw new Error(data.error);
                }

                setCommunities(data);
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setCommunities([]);
                setError(err.message);
            }
        };

        loadCommunity();
    }, [token, user]);

    async function fetchCommunities() {
        try {
            setLoading(true);
            const res = await api.get(
                "/users/communities/1?announcements=true&members=true&admins=true",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await res.data;

            if (data.error) {
                throw new Error(data.error);
            }

            setCommunities(data);
            setLoading(false);
        } catch (err: any) {
            console.error(err);
            setCommunities([]);
            setError(err.message);
        }
    }

    async function joinCommunity(community_code: string) {
        setLoading(true);
        try {
            const res = await api.post(`/communities/join/${community_code}`);

            const data = await res.data;

            if (data.statusCode) {
                if (data.statusCode === 404) {
                    setError("Nie znaleziono mOsiedla o podanym kodzie");
                }
                setLoading(false);
                return false;
            }

            setCommunities((prev) => [...(prev || []), data]);
            setLoading(false);
            return true;
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setLoading(false);
            return false;
        }
    }

    async function leaveCommunity(community_id: string) {
        setLoading(true);
        try {
            const res = await api.post(`/communities/leave/${community_id}`);

            const data = await res.data;

            if (data.statusCode) {
                if (data.statusCode === 404) {
                    setError("Nie znaleziono mOsiedla o podanym kodzie");
                }
                setLoading(false);
                return false;
            }

            setCommunities((prev) =>
                prev?.filter((c) => c.id !== community_id)
            );
            setLoading(false);
            return true;
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setLoading(false);
            return false;
        }
    }

    return {
        communities,
        error,
        loading,
        fetchCommunities,
        joinCommunity,
        leaveCommunity,
    };
}
