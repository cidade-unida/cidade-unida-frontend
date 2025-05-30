import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import DenunciaCard from "@/components/denuncias/DenunciaCard";
import { useUserReports } from "@/hooks/useUserReports";
import { useAuth } from "@/context/AuthContext";

const MinhasDenuncias = () => {
  const { currentUser: user, loading: authLoading } = useAuth();
  const { reports: denuncias, loading, error } = useUserReports(user?.uid || null);

  if (authLoading) {
    return <p>Carregando autenticação...</p>;
  }

  if (!user) {
    return <p>Você precisa estar logado para ver suas denúncias.</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5" />
        Minhas Denúncias
      </h2>

      {loading && <p>Carregando denúncias...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {denuncias.length === 0 && !loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-10 text-muted-foreground">
              <p>Você ainda não fez nenhuma denúncia.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {denuncias.map((denuncia) => (
            <DenunciaCard key={denuncia.reportId} denuncia={denuncia} />
          ))}
        </div>
      )}
    </>
  );
};

export default MinhasDenuncias;
