'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/placeholder-images';
import { ArrowLeft, Upload } from 'lucide-react';

const uploadFormSchema = z.object({
  name: z.string().min(3, 'Tool name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  category: z.string().min(1, "Please select a category."),
  price: z.coerce.number().positive('Price must be a positive number.'),
  condition: z.enum(['New', 'Excellent', 'Good', 'Used']),
  image: z.any().refine((files) => files?.length === 1, 'Image is required.'),
});

export default function UploadToolPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof uploadFormSchema>>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
    },
  });

  function onSubmit(values: z.infer<typeof uploadFormSchema>) {
    console.log(values);
    toast({
      title: 'Tool Uploaded!',
      description: `Your ${values.name} has been listed for rent.`,
    });
    router.push('/rent');
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4">
        <Button asChild variant="ghost">
          <Link href="/rent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rentals
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Tool</CardTitle>
          <CardDescription>
            Fill out the form below to list your agricultural tool for rent.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tool Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Power Tiller" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your tool, its features, and any attachments."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Day (Rs)</FormLabel>
                      <FormControl>
                        <Input type="number" step="10" placeholder="e.g., 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the tool's condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(cat => (
                             <SelectItem key={cat.name} value={cat.name} className="capitalize">{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tool Image</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                     <FormDescription>
                        Upload a clear picture of your tool.
                      </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                List My Tool
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
