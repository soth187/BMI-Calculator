namespace BMI_Calc
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private async void ObliczBMI(object sender, EventArgs e)
        {
            string waga = InputWaga.Text;
            string wzrost = InputWzrost.Text;

            System.Diagnostics.Debug.WriteLine(waga);
            System.Diagnostics.Debug.WriteLine(wzrost);

            //if (string.IsNullOrWhiteSpace(waga) || string.IsNullOrWhiteSpace(wzrost))
            //{
            //    DisplayAlert("Błąd", "Proszę wprowadzić zarówno wagę, jak i wzrost.", "OK");
            //    return;
            //}

            bool poprawnaWaga = double.TryParse(waga, out double wagaLiczba);
            if (poprawnaWaga == false || wagaLiczba <= 0)
            {
                await DisplayAlert("Błąd", "Proszę wprowadzić poprawnie wagę w KG (np. 70,5)", "OK");
                return;
            }

            bool poprawnyWzrost = double.TryParse(wzrost, out double wzrostLiczba);
            if (poprawnyWzrost == false || wzrostLiczba <= 0)
            {
                await DisplayAlert("Błąd", "Proszę wprowadzić poprawnie wzrost w CM (np. 175)", "OK");
                return;
            }

            double BMICalc = wagaLiczba / Math.Pow((wzrostLiczba / 100),2);

            LabelBMI.Text = $"BMI: {BMICalc:F2}";

            if(BMICalc < 18.5)
            {
                LabelKategoria.Text = "Niedowaga (Poniżej 18.5)";
                LabelKategoria.TextColor = Color.FromHex("#1565C0");
                LabelBMI.TextColor = Color.FromHex("#1565C0");
            }
            else if(BMICalc < 25)
            {
                LabelKategoria.Text = "Norma (18.5 - 24.9)";
                LabelKategoria.TextColor = Color.FromHex("#2E7D32");
                LabelBMI.TextColor = Color.FromHex("#2E7D32");
            }
            else if(BMICalc < 30)
            {
                LabelKategoria.Text = "Nadwaga (25 - 29.9)";
                LabelKategoria.TextColor = Color.FromHex("#E65100");
                LabelBMI.TextColor = Color.FromHex("#E65100");
            }
            else
            {
                LabelKategoria.Text = "Otyłość (30 i więcej)";
                LabelKategoria.TextColor = Color.FromHex("#C62828");
                LabelBMI.TextColor = Color.FromHex("#C62828");
            }
        }


    }
}