import { getProducts } from "@/lib/products";

export default async function AdminDashboard() {
  const products = await getProducts();
  const totalUnits = products.reduce(
    (sum, p) => sum + p.variants.reduce((s, v) => s + v.inventory, 0),
    0
  );
  const lowStock = products.flatMap((p) =>
    p.variants.filter((v) => v.inventory <= 5).map((v) => ({ product: p, variant: v }))
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="bg-ink text-paper px-8 py-6">
        <p className="font-mono text-[11px] uppercase tracking-widest2 text-flare mb-1">Admin</p>
        <h1 className="font-display text-3xl">Dashboard</h1>
      </div>

      <div className="grid grid-cols-3 gap-6 px-8 py-8">
        <StatCard label="Products" value={products.length} />
        <StatCard label="Units in stock" value={totalUnits} />
        <StatCard label="Low stock variants" value={lowStock.length} />
      </div>

      <div className="px-8 pb-16">
        <h2 className="font-display text-xl mb-4">Products</h2>
        <table className="w-full text-sm border-t border-stone-light/60">
          <thead>
            <tr className="text-left text-stone eyebrow border-b border-stone-light/60">
              <th className="py-3">Product</th>
              <th className="py-3">Category</th>
              <th className="py-3">Variants</th>
              <th className="py-3">Inventory</th>
              <th className="py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const inventory = p.variants.reduce((s, v) => s + v.inventory, 0);
              return (
                <tr key={p.id} className="border-b border-stone-light/40">
                  <td className="py-3 font-medium">{p.title}</td>
                  <td className="py-3 text-stone">{p.category}</td>
                  <td className="py-3 text-stone">{p.variants.length}</td>
                  <td className="py-3">
                    <span
                      className={
                        inventory <= 10 ? "text-red-600" : "text-moss"
                      }
                    >
                      {inventory} units
                    </span>
                  </td>
                  <td className="py-3 font-mono">${p.basePrice.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-stone-light/60 p-6">
      <p className="eyebrow mb-2">{label}</p>
      <p className="font-display text-3xl">{value}</p>
    </div>
  );
}
