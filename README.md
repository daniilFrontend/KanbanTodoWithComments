

Описание проекта Менеджер задач со следуищими реализованными фичами:

-Создание проектов и задач для каждого отдельного проекта

-Переход между страницами без перезагрузки

-Все задачи имеют приоритет (красный, желтый, зеленый), все задачи поделены на 3 статуса (QUEUE, DEVELOPMENT, DONE). Любая задача может быть удалена

-На странице с задачами реализован Drag and Drop. Задачи можно перетаскивать по статусам, и сортировать при перемещении

-Каждая задача может быть развернута с дополнительной информацией в нее входят: подзадачи, описание, дата создания, дата окончания, время в работе, комментарии

-Дополнительную информацию можно редактировать. Подзадачи можно удалять, добавлять и изменять их статус (выполнение всех подзадач не влияет на основную задачу), описание задачи также можно редактировать.
-Реализована система каскадных комментариев (можно отвечать на любой комментарий и подкомментарий)

-Реазиловано сохранение данных в браузере, при перезагрузке все данные сохраняются

Используемый стэк:

-React

-Redux-toolkit

-React Dnd

-Redux-persist

-React-router

-Стилизация с react modules и scss


От создателя: Выкачена версия MVP, при дальнейшей работе над продуктом могла быть добавлена адаптивность, проведен рефакторинг кода. К примеру часто встречается перетаскивание копипасты в стилях либо при работе со стейтом есть повторение логики для поиска нужной задачи или проекта, валидацию можно вынести в кастомный хук. Всю логику можно было вынести без повторений. Как итог считаю, что реализация в проекта в достаточной мере показывает мои навыки.
