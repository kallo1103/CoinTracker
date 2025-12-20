
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Asset {
    id: string;
    coinId: string;
    symbol: string;
    name: string;
    quantity: number;
    buyPrice: number;
    buyDate: string;
}

const fetchAssets = async (): Promise<Asset[]> => {
    const res = await fetch("/api/portfolio/assets");
    if (!res.ok) throw new Error("Failed to fetch assets");
    return res.json();
};

export function usePortfolioAssets() {
    return useQuery({
        queryKey: ['portfolioAssets'],
        queryFn: fetchAssets,
    });
}

export function useAddAsset() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newAsset: Omit<Asset, "id" | "buyDate">) => {
            const res = await fetch("/api/portfolio/assets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAsset),
            });
            if (!res.ok) throw new Error("Failed to add asset");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolioAssets'] });
        },
        onError: (error: Error) => {
            console.error("Failed to add asset", error);
        },
    });
}

export function useDeleteAsset() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/portfolio/assets/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete asset");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolioAssets'] });
        },
    });
}
