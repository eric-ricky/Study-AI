"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { BarChart3, Clock, FileText, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DocumentStats {
  total_documents: number;
  total_chats: number;
  recent_activity: {
    date: string;
    action: string;
    document: string;
    document_id: string;
  }[];
}

const DashboardPageContent = () => {
  const [stats, setStats] = useState<DocumentStats>({
    total_documents: 0,
    total_chats: 0,
    recent_activity: [],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const { data: documents } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id);

        console.log("DOCUMENTS ===>", documents);

        const { data: chats } = await supabase
          .from("chats")
          .select("*")
          .eq("user_id", user.id);

        setStats({
          total_documents: documents?.length || 0,
          total_chats: chats?.length || 0,
          recent_activity:
            documents?.slice(0, 5).map((doc) => ({
              date: new Date(doc.created_at).toLocaleDateString(),
              action: "Uploaded",
              document: doc.name,
              document_id: doc.id,
            })) || [],
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-12 rounded-full bg-muted mx-auto" />
          <div className="h-4 w-32 rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Manage your documents and conversations
          </p>
        </div>
      </div>

      <div className="hidden">
        <div className="gap-6 md:grid-cols-3 mb-8 hidden lg:grid">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_documents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Chat Sessions
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_chats}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Activity
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.recent_activity.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Documents</h2>
              <Button asChild>
                <Link href="/upload">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Link>
              </Button>
            </div>

            {stats.total_documents === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No documents yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Upload your first document to get started
                  </p>
                  <Button asChild>
                    <Link href="/upload">Upload Document</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border rounded-md border">
                    {stats.recent_activity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium leading-none">
                              {activity.document.split("-").pop()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Uploaded on {activity.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" asChild>
                          <Link href={`/chat/${activity.document_id}`}>
                            Chat
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {stats.recent_activity.map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.action} {activity.document}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex items-center justify-center py-8">
                  <BarChart3 className="h-16 w-16 text-muted-foreground" />
                  <p className="text-muted-foreground ml-4">
                    Analytics data will be available soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPageContent;
