import { experiences } from "@/app/constants";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";



export default function Experience() {
  return (
    <section id="experience" className=" bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-neutral-900 dark:text-white mb-12 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Briefcase className="w-8 h-8 text-blue-500" />
          Experience
        </motion.h2>

        <div className="relative border-l border-neutral-300 dark:border-neutral-700">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-12 ml-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute -left-3 top-1.5 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-neutral-900"></div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                {exp.company} <span className="text-blue-500">| {exp.role}</span>
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {exp.period}
              </p>
              <ul className="mt-3 list-disc ml-5 space-y-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
