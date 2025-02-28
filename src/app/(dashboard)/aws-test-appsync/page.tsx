'use client';

import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import { useState, useEffect } from 'react';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

// Interfaces para errores
interface AmplifyError extends Error {
  message: string;
  code?: string;
}

// Configuración de Amplify
Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://cdmhpg4fabcqfhbezs6jywe67u.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-fhu25b6h3fbwtmxxiokrzshoee'
    }
  }
});

// Inicializar el cliente
const client = generateClient();

// Schema de validación con Zod
const formSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
  price: z.string().optional(),
  rating: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Tipos GraphQL
type MyCustomType = {
  id: string;
  title: string;
  content: string;
  price?: number;
  rating?: number;
};

type ListMyCustomTypesResponse = {
  listMyCustomTypes: {
    items: MyCustomType[];
    nextToken?: string;
  };
};

// Queries y Mutations
const queries = {
  listMyCustomTypes: /* GraphQL */ `
    query ListMyCustomTypes($limit: Int, $nextToken: String) {
      listMyCustomTypes(limit: $limit, nextToken: $nextToken) {
        items {
          id
          title
          content
          price
          rating
        }
        nextToken
      }
    }
  `
};

const mutations = {
  createMyCustomType: /* GraphQL */ `
    mutation CreateMyCustomType($input: CreateMyCustomTypeInput!) {
      createMyCustomType(input: $input) {
        id
        title
        content
        price
        rating
      }
    }
  `,
  
  deleteMyCustomType: /* GraphQL */ `
    mutation DeleteMyCustomType($input: DeleteMyCustomTypeInput!) {
      deleteMyCustomType(input: $input) {
        id
      }
    }
  `
};

export default function AwsTestAppSync() {
  const [items, setItems] = useState<MyCustomType[]>([]);
  const [loading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    try {
      const response = await client.graphql({
        query: queries.listMyCustomTypes,
        variables: {
          limit: 10
        }
      }) as GraphQLResult<ListMyCustomTypesResponse>;

      if (response.data) {
        setItems(response.data.listMyCustomTypes.items);
      }
    } catch (error: unknown) {
      console.error('Error fetching items:', error);
      
      const amplifyError = error as AmplifyError;
      let errorMessage = 'Error desconocido';
      
      if (amplifyError.message?.includes('No credentials')) {
        errorMessage = 'API Key no válida o no proporcionada';
      } else if (amplifyError.message?.includes('Network error')) {
        errorMessage = 'El endpoint de GraphQL no es accesible';
      } else if (amplifyError.message?.includes('Invalid API key')) {
        errorMessage = 'API Key inválida';
      } else if (amplifyError.message?.includes('Unable to resolve host')) {
        errorMessage = 'No se puede resolver el host';
      }
      
      toast.error('Error de configuración', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      const input = {
        title: data.title,
        content: data.content,
        price: data.price ? parseInt(data.price) : null,
        rating: data.rating ? parseFloat(data.rating) : null
      };

      await client.graphql({
        query: mutations.createMyCustomType,
        variables: { input }
      });

      toast.success('Item creado correctamente');
      reset();
      fetchItems();
    } catch (error: unknown) {
      const amplifyError = error as AmplifyError;
      toast.error('Error al crear item', {
        description: amplifyError.message,
      });
    }
  };

  async function handleDelete(id: string) {
    try {
      await client.graphql({
        query: mutations.deleteMyCustomType,
        variables: {
          input: { id }
        }
      });
      toast.success('Item eliminado correctamente');
      fetchItems();
    } catch (error: unknown) {
      const amplifyError = error as AmplifyError;
      toast.error('Error al eliminar item', {
        description: amplifyError.message,
      });
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AWS AppSync Test</h1>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            {...register('title')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.title && "border-red-500"
            )}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contenido</label>
          <textarea
            {...register('content')}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              errors.content && "border-red-500"
            )}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input
            type="number"
            {...register('price')}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            {...register('rating')}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button 
          type="submit"
          className="flex items-center justify-center w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Crear Item
        </button>
      </form>

      {/* Lista de items */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{item.content}</p>
                  {item.price && <p className="mt-1 text-sm">Precio: ${item.price}</p>}
                  {item.rating && <p className="mt-1 text-sm">Rating: {item.rating}</p>}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}