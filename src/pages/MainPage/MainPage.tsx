import './MainPage.css'

function MainPage() {
    return ( 
        <main>
            <table>
                <caption>Жим лежа</caption>
                <thead>
                    <tr> 
                        <th>Подход</th>
                        <th>Вес (кг)</th>
                        <th>Количество повторений</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>60</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>70</td>
                        <td>9</td>
                    </tr>
                </tbody>
            </table>
        </main>
     );
}

export default MainPage;