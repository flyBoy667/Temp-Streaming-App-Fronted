import {useState} from "react"
import {
    Box,
    Button,
    CssVarsProvider,
    Divider,
    extendTheme,
    IconButton,
    Input,
    LinearProgress,
    Sheet,
    Stack,
    Tooltip,
    Typography,
} from "@mui/joy"
import {api} from "../../Services/api.js";


const ThermostatIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
        <path d="M12 9a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1Z"/>
    </svg>
)

const InfoIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
    </svg>
)

// Créer un thème personnalisé
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

export const HomePage = () => {
    const [temperature, setTemperature] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [lastTemp, setLastTemp] = useState(null)
    const [colorLevel, setColorLevel] = useState("primary"
    )

    const onSubmit = async (temp) => {
        try {
            setIsSubmitting(true)
            await api.post('/api/temperature', {
                temperature: temp
            })

            setLastTemp(temp)
            setIsSubmitting(false)

            // Changer la couleur en fonction de la température
            if (temp < 10) setColorLevel("info")
            else if (temp < 25) setColorLevel("success")
            else if (temp < 35) setColorLevel("warning")
            else setColorLevel("danger")

        } catch (err) {
            setError("Une erreur est survenue lors de l'ajout")
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (temperature !== "") {
            onSubmit(Number.parseFloat(temperature))
        }
    }

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
                        maxWidth: 400,
                        mx: "auto",
                        p: 4,
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
                    }}
                >
                    {isSubmitting && (
                        <LinearProgress
                            color={colorLevel}
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                borderTopLeftRadius: "xl",
                                borderTopRightRadius: "xl",
                            }}
                        />
                    )}

                    <Box sx={{display: "flex", alignItems: "center", mb: 3}}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 48,
                                height: 48,
                                borderRadius: "50%",
                                bgcolor: `${colorLevel}.100`,
                                color: `${colorLevel}.700`,
                                mr: 2,
                            }}
                        >
                            <ThermostatIcon/>
                        </Box>
                        <Typography
                            level="h3"
                            sx={{
                                background: "linear-gradient(90deg, #007FFF 0%, #0059B2 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: "bold",
                            }}
                        >
                            Saisie de Température
                        </Typography>
                    </Box>

                    <Divider sx={{my: 2}}/>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <Box sx={{position: "relative"}}>
                                <Input
                                    type="number"
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                    placeholder="Température en °C"
                                    required
                                    size="lg"
                                    color={colorLevel}
                                    startDecorator={<ThermostatIcon/>}
                                    endDecorator={
                                        <Tooltip title="Entrez la température actuelle en degrés Celsius" arrow>
                                            <IconButton variant="plain" size="sm" color="neutral">
                                                <InfoIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    }

                                    sx={{
                                        "--Input-focusedThickness": "2px",
                                        "--Input-radius": "12px",
                                        transition: "all 0.2s",
                                        "&:hover": {
                                            boxShadow: "0 0 0 2px rgba(0, 127, 255, 0.1)",
                                        },
                                    }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                color={colorLevel}
                                size="lg"
                                disabled={!temperature || isSubmitting}
                                sx={{
                                    borderRadius: "12px",
                                    fontWeight: "bold",
                                    boxShadow: "md",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "lg",
                                    },
                                }}
                            >
                                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                            </Button>
                        </Stack>
                    </form>

                    {lastTemp !== null && (
                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                borderRadius: "md",
                                bgcolor: `${colorLevel}.50`,
                                border: "1px solid",
                                borderColor: `${colorLevel}.200`,
                                transition: "all 0.3s",
                                animation: "fadeIn 0.5s",
                                "@keyframes fadeIn": {
                                    "0%": {opacity: 0, transform: "translateY(10px)"},
                                    "100%": {opacity: 1, transform: "translateY(0)"},
                                },
                            }}
                        >
                            <Typography level="body-md" sx={{color: `${colorLevel}.700`, fontWeight: "medium"}}>
                                Dernière température enregistrée: <strong>{lastTemp}°C</strong>
                            </Typography>
                        </Box>
                    )}
                </Sheet>
            </Box>
        </CssVarsProvider>
    )
}
