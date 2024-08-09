import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const clickToBack = () => {
		setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
	};
	const clickToForward = () => {
		setActiveIndex((prevIndex) => (prevIndex < 6 ? prevIndex + 1 : (prevIndex = 0)));
	};

	let isFirstStep;
	if (activeIndex === 0) {
		isFirstStep = true;
	} else {
		isFirstStep = false;
	}
	let isLastStep;
	if (activeIndex === steps.length - 1) {
		isLastStep = true;
	} else {
		isLastStep = false;
	}

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>{steps[activeIndex].content}</div>
					<ul className={styles["steps-list"]}>
						{steps.map((item, index) => {
							return (
								<li
									key={item.id}
									className={
										styles["steps-item"] +
										" " +
										(index <= activeIndex ? styles.done : "") +
										" " +
										(index === activeIndex ? styles.active : "")
									}
								>
									<button
										className={styles["steps-item-button"]}
										onClick={() => setActiveIndex(index)}
									>
										{index + 1}
									</button>
									{steps[index].title}
								</li>
							);
						})}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={clickToBack}
							disabled={isFirstStep}
						>
							Назад
						</button>
						{isLastStep ? (
							<button className={styles.button} onClick={clickToForward}>
								Начать сначала
							</button>
						) : (
							<button className={styles.button} onClick={clickToForward}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
