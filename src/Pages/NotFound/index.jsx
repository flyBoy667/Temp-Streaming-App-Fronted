import {Box, Button, CssVarsProvider, extendTheme, Sheet, Typography} from "@mui/joy"
import {keyframes} from "@emotion/react";
import {useNavigate} from 'react-router-dom';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: "#f0f7ff",
                    100: "#c2e0ff",
                    200: "#99ccf3",
                    300: "#66b2ff",
                    400: "#3399ff",
                    500: "#007fff",
                    600: "#0072e5",
                    700: "#0059b2",
                    800: "#004c99",
                    900: "#003a75",
                },
            },
        },
    },
})

// Animation de flottement pour l'icône
const float = keyframes`
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
`

// Icône thermomètre cassé
const BrokenThermometerIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
        <path d="M12 9a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1Z"/>
        <line x1="4" y1="4" x2="20" y2="20"/>
    </svg>
)

export function NotFound() {
    const navigate = useNavigate();

    return (
        <CssVarsProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "linear-gradient(145deg, #f0f7ff 0%, #ffffff 100%)",
                    p: 2,
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: "100%",
                        maxWidth: 500,
                        mx: "auto",
                        p: 5,
                        borderRadius: "xl",
                        boxShadow: "lg",
                        background: "linear-gradient(145deg, #ffffff 0%, #f8faff 100%)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "xl",
                        },
                        overflow: "hidden",
                        position: "relative",
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                        }}
                    >
                        <Box
                            sx={{
                                color: "primary.500",
                                animation: `${float} 3s ease-in-out infinite`,
                                mb: 2,
                            }}
                        >
                            <BrokenThermometerIcon/>
                        </Box>

                        <Typography
                            level="h1"
                            sx={{
                                fontSize: {xs: "3rem", md: "4rem"},
                                background: "linear-gradient(90deg, #007FFF 0%, #0059B2 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: "bold",
                                mb: 1,
                            }}
                        >
                            404
                        </Typography>

                        <Typography
                            level="h3"
                            sx={{
                                mb: 2,
                                color: "neutral.700",
                            }}
                        >
                            Page introuvable
                        </Typography>

                        <Typography
                            level="body-lg"
                            sx={{
                                mb: 4,
                                color: "neutral.600",
                                maxWidth: "400px",
                            }}
                        >
                            La page que vous recherchez semble avoir disparu, comme une température qui s'évapore dans
                            l'air.
                        </Typography>

                        <Button
                            size="lg"
                            color="primary"
                            variant="solid"
                            onClick={() => navigate("/")}
                            sx={{
                                borderRadius: "12px",
                                fontWeight: "bold",
                                boxShadow: "md",
                                transition: "transform 0.2s",
                                px: 4,
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: "lg",
                                },
                            }}
                        >
                            Retour à l'accueil
                        </Button>
                    </Box>
                </Sheet>
            </Box>
        </CssVarsProvider>
    )
}
