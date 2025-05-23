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
  outline: {
    title: string;
    points: string[];
  }[];
  keywords: string[];
  multimedia: {
    type: string;
    description: string;
    placement: string;
  }[];
  checklist: string[];
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
      <Card className="w-full">
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
                <span className="ml-2">Generating detailed report...</span>
              </div>
            )}

            {report && selectedTitle && (
              <div className="space-y-6 pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">{selectedTitle.title}</h3>
                  <Button variant="outline" onClick={resetAnalyzer}>
                    Back to results
                  </Button>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trend Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{report.overview}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Outline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {report.outline.map((section, index) => (
                          <div key={index}>
                            <h4 className="font-medium">{section.title}</h4>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              {section.points.map((point, pointIndex) => (
                                <li key={pointIndex}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Keywords</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {report.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Multimedia Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {report.multimedia.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <div className="font-medium w-20">{item.type}:</div>
                            <div className="flex-1">
                              <p>{item.description}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Placement: {item.placement}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Production Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {report.checklist.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded border flex items-center justify-center">
                              <span className="text-xs">{index + 1}</span>
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
