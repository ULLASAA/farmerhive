'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rentalItems, buyableCategories } from '@/lib/placeholder-images';
import { IndianRupee, Tractor, ShoppingBag, Percent, Users, AlertTriangle, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import PredictiveDemand from './predictive-demand';

// --- Mock Data Simulation ---
// In a real app, this would come from a database of completed transactions.

const COMPANY_COMMISSION_RATE = 0.15; // 15% commission

const daysOverdue = (dueDate: Date) => {
    const diff = new Date().getTime() - dueDate.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}


// --- Component ---
export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const transactions = rentalItems
      // Simulate that some items have been successfully rented or sold
      .filter((_, index) => index % 2 === 0) 
      .map(item => {
        const isSale = buyableCategories.includes(item.category);
        // Simulate a final transaction price, slightly different from list price
        const transactionPrice = item.price * (1 + (Math.random() - 0.5) * 0.1); // +/- 10%
        const companyProfit = transactionPrice * COMPANY_COMMISSION_RATE;
        const ownerPayout = transactionPrice - companyProfit;
        const date = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000); // Random date in last 30 days

        return {
          ...item,
          transactionType: isSale ? 'Sale' : 'Rental',
          transactionPrice,
          companyProfit,
          ownerPayout,
          date,
        };
      });

    const overdueItems = rentalItems
      .filter((item, index) => item.availability.status === 'Rented Out' && index % 3 === 0)
      .map((item, index) => ({
        ...item,
        renter: { name: index % 2 === 0 ? 'Vijay Singh' : 'Anita Sharma' },
        dueDate: new Date(Date.now() - (index + 2) * 24 * 60 * 60 * 1000), // Due 2-4 days ago
        penalty: (index + 1) * 50,
        lastLocation: { lat: 30.89 + (Math.random() - 0.5) * 0.1, lng: 75.83 + (Math.random() - 0.5) * 0.1 },
      }));

    // --- Calculations ---
    const totalRevenue = transactions.reduce((acc, t) => acc + t.transactionPrice, 0);
    const totalOwnerPayouts = transactions.reduce((acc, t) => acc + t.ownerPayout, 0);
    const totalCompanyProfit = transactions.reduce((acc, t) => acc + t.companyProfit, 0);
    const totalRentals = transactions.filter(t => t.transactionType === 'Rental').length;
    const totalSales = transactions.filter(t => t.transactionType === 'Sale').length;
    const companyProfitMargin = totalRevenue > 0 ? (totalCompanyProfit / totalRevenue) * 100 : 0;
    const farmerSharePercentage = totalRevenue > 0 ? (totalOwnerPayouts / totalRevenue) * 100 : 0;

    const revenueByCategory = transactions.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = 0;
      }
      acc[t.category] += t.companyProfit;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(revenueByCategory).map(([name, profit]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize category name
      profit: parseFloat(profit.toFixed(2)),
    }));

    setDashboardData({
      transactions,
      overdueItems,
      totalRevenue,
      totalOwnerPayouts,
      totalCompanyProfit,
      totalRentals,
      totalSales,
      companyProfitMargin,
      farmerSharePercentage,
      chartData,
    });
  }, []);

  const mapEmbedUrl = (lat: number, lng: number) => `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1678886400000`;
  
  if (!dashboardData) {
    // You can return a loading spinner or skeleton loaders here
    return <div>Loading dashboard...</div>;
  }
  
  const { 
    transactions, 
    overdueItems, 
    totalCompanyProfit, 
    totalRentals, 
    totalSales, 
    companyProfitMargin, 
    farmerSharePercentage,
    chartData 
  } = dashboardData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Company Dashboard</h1>
      <p className="mb-8 text-lg text-muted-foreground">Welcome back, here's an overview of your platform's performance and market insights.</p>
      
      {/* Predictive Demand Section */}
      <div className="mb-8">
        <PredictiveDemand />
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Company Profit</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {totalCompanyProfit.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">from {transactions.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rentals</CardTitle>
            <Tractor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRentals}</div>
             <p className="text-xs text-muted-foreground">Completed rental agreements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">Items sold from marketplace</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Profit Margin</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyProfitMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Based on total revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmer's Share</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerSharePercentage.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Percentage of revenue paid out</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/50 text-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Rentals</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueItems.length}</div>
            <p className="text-xs text-muted-foreground">Items not returned on time</p>
          </CardContent>
        </Card>
      </div>

       {/* Security Section */}
      <Card className="mb-8 border-amber-500/50 bg-amber-50/50 dark:bg-amber-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-500">
            <AlertTriangle />
            Security Monitoring
          </CardTitle>
          <CardDescription>
            Tools that are not returned on time are flagged for review. The company can monitor the location of these tools to ensure recovery.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <h3 className="font-semibold mb-4">Overdue Items ({overdueItems.length})</h3>
             <Dialog onOpenChange={() => setSelectedLocation(null)}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Renter</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead className="text-right">Penalty</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overdueItems.map((item: any) => (
                      <TableRow key={item.id} className="bg-background">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.renter.name}</TableCell>
                        <TableCell>{daysOverdue(item.dueDate)}</TableCell>
                        <TableCell className="text-right text-destructive font-semibold">Rs {item.penalty.toFixed(2)}</TableCell>
                         <TableCell className="text-right">
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedLocation(item.lastLocation)}>
                              <MapPin className="mr-2 h-4 w-4" />
                              Track
                            </Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                 <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Live Tool Location</DialogTitle>
                    <DialogDescription>
                      Last known location of the tool. This is a security feature for internal monitoring only.
                    </DialogDescription>
                  </DialogHeader>
                  {selectedLocation && (
                     <div className="aspect-video w-full overflow-hidden rounded-lg border">
                        <iframe
                            src={mapEmbedUrl(selectedLocation.lat, selectedLocation.lng)}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                  )}
                 </DialogContent>
             </Dialog>
              <div className="mt-6 rounded-md border border-dashed border-destructive/80 p-4 bg-destructive/10 text-destructive-foreground/90 text-sm">
                <h4 className="font-bold flex items-center gap-2"><Phone /> Owner Helpline</h4>
                <p>If a tool owner has not received their item back after the due date, they should contact the <span className="font-semibold">farmerhive</span> helpline at <a href="tel:1800-200-5555" className="font-bold underline">1800-200-5555</a>. Our team will initiate the recovery process.</p>
            </div>
        </CardContent>
      </Card>


      <div className="grid gap-8 lg:grid-cols-5">
        {/* Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Profit by Category</CardTitle>
            <CardDescription>
              Company profit generated from each item category.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis strokeWidth={1} tickFormatter={(value) => `Rs ${value}`} />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col space-y-1">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                              <span className="font-bold text-muted-foreground">
                                Rs {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="profit" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Transactions Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>A list of the most recent sales and rentals.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 5).map((t:any) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {t.transactionType} &middot; {t.category}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      +Rs {t.companyProfit.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
