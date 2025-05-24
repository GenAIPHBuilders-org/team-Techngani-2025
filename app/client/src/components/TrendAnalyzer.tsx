"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Loader2 } from "lucide-react";

interface TrendTitle {
  id: number;
  title: string;
}

interface TrendReport {
  overview: string;
}

export function TrendAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [niche, setNiche] = useState("");
  const [trendTitles, setTrendTitles] = useState<TrendTitle[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<TrendTitle | null>(null);
  const [report, setReport] = useState<TrendReport | null>(null);

  const placeholders = [
    "Digital marketing",
    "Sustainable fashion",
    "Web3 technologies",
    "Remote work tools",
    "Health and wellness",
  ];

  const handleNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNiche(e.target.value);
  };

  const handleNicheSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!niche) return;

    setLoading(true);
    setTrendTitles([]);
    setSelectedTitle(null);
    setReport(null);

    try {
      const response = await fetch("/api/trends/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche }),
      });

      const data = await response.json();

      if (data.titles && Array.isArray(data.titles)) {
        setTrendTitles(
          data.titles.map((title: string, index: number) => ({
            id: index,
            title,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to analyze trends:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectTitle = async (title: TrendTitle) => {
    setSelectedTitle(title);
    setAnalyzing(true);
    setReport(null);

    try {
      const response = await fetch("/api/trends/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          niche,
          selectedIndex: title.id,
        }),
      });

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Failed to generate report:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalyzer = () => {
    setSelectedTitle(null);
    setReport(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Trend Analyzer</CardTitle>
          <CardDescription>
            Discover trending content ideas for any topic or niche
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleNicheChange}
              onSubmit={handleNicheSubmit}
            />

            {loading && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Analyzing trends...</span>
              </div>
            )}

            {trendTitles.length > 0 && !selectedTitle && (
              <div className="space-y-4 py-4">
                <h3 className="text-lg font-medium">
                  Top 5 Trending Content Ideas:
                </h3>
                <div className="grid gap-2">
                  {trendTitles.map((title) => (
                    <Card
                      key={title.id}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => selectTitle(title)}
                    >
                      <CardContent className="p-4">
                        <p>{title.title}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {analyzing && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Generating trend overview...</span>
              </div>
            )}

            {selectedTitle && report && (
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">{selectedTitle.title}</h3>
                  <Button variant="outline" onClick={resetAnalyzer}>
                    Back to results
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Trend Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed">{report.overview}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
