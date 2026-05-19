import Layout from "@/components/layouts/Layout";

export default function layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <Layout>{children}</Layout>
    )
}
