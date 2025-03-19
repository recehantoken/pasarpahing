import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  const { t } = useLanguage();

  const teamMembers = [
    { name: "John Doe", role: t('about.team.role1'), avatar: "/team/john.jpg" },
    { name: "Jane Smith", role: t('about.team.role2'), avatar: "/team/jane.jpg" },
    { name: "Ahmad Yani", role: t('about.team.role3'), avatar: "/team/ahmad.jpg" },
  ];

  const values = [
    { title: t('about.values.community'), description: t('about.values.communityDesc') },
    { title: t('about.values.authenticity'), description: t('about.values.authenticityDesc') },
    { title: t('about.values.sustainability'), description: t('about.values.sustainabilityDesc') },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.description')}
          </p>
          <div className="mt-8">
            <img
              src="/logo-pasarpahing.png" // Replace with your image path
              alt={t('about.imageAlt')}
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg object-cover h-64 md:h-96"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="border-primary/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">
                {t('about.missionTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('about.mission')}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('about.valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-primary/20 shadow-md hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t('about.teamTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-primary/20 shadow-md bg-card/80 backdrop-blur-sm text-center">
                <CardContent className="pt-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary/20">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;