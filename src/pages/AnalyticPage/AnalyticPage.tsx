import LastTrainingWidget from "../../components/Widgets/LastTrainingWidget/LastTrainingWidget";
import MyWeightWidget from "../../components/Widgets/MyWeightWidget/MyWeightWidget";
import TimerWidget from "../../components/Widgets/TimerWidget/TimerWidget";
import TrainingAnalytics from "../../components/Widgets/TrainingAnalytics/TrainingAnalytics";
import './AnalyticPage.css'

function AnalyticPage() {
    return (
        <main className="main">
            <LastTrainingWidget />
            <MyWeightWidget />
            <TimerWidget />
            <TrainingAnalytics />
        </main>
    );
}

export default AnalyticPage;