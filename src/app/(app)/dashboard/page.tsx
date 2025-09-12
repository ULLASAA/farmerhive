
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rentalItems, buyableCategories } from '@/lib/placeholder-images';
import { IndianRupee, Tractor, ShoppingBag, Percent, Users } from 'lucide-react';

// --- Mock Data Simulation ---
// In a real app, this would come from a database of completed transactions.

const COMPANY_COMMISSION_RATE = 0.15; // 15% commission

const transactions = rentalItems
  // Simulate that some items have been successfully rented or sold
  .filter((_, index) => index % 2 === 0) 
  .map(item => {
    const isSale = buyableCategories.includes(item.category);
    // Simulate a final transaction price, slightly different from list price
    const transactionPrice = item.price * (Math.random() * (1.1 - 0.9) + 0.9); 
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

// --- Component ---
export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Company Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
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
      </div>

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
                {transactions.slice(0, 5).map((t) => (
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
